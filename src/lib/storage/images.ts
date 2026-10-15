import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { hasFirebaseAdmin } from "@/lib/firebase/config";

/**
 * Las fotos viven en Firestore (colección `images`, un documento por foto, ya comprimida en el
 * navegador a menos de ~900 KB) y se sirven por /media/[id] con caché larga. Así el proyecto funciona
 * en el plan Spark de Firebase, que no incluye Cloud Storage (mismo enfoque que Space).
 * Sin credenciales de Firebase y fuera de producción se guardan en .local-data/uploads.
 */

const LOCAL_DIR = path.join(process.cwd(), ".local-data", "uploads");
const COLLECTION = "images";

export const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_.-]{9,199}$/;
export const MAX_STORED_BYTES = 900 * 1024;

export const isLocalStorage = () => !hasFirebaseAdmin() && process.env.NODE_ENV !== "production";

export type ImageRef = { id: string; url: string };

const EXT_TYPES: Record<string, string> = { webp: "image/webp", jpg: "image/jpeg", png: "image/png" };

export async function saveImage(id: string, data: Buffer, contentType: string): Promise<ImageRef> {
  if (!ID_PATTERN.test(id)) throw new Error("Identificador de imagen no válido.");
  if (isLocalStorage()) {
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    await fs.writeFile(path.join(LOCAL_DIR, id), data);
  } else {
    const { adminDb } = await import("@/lib/firebase/admin");
    await adminDb().doc(`${COLLECTION}/${id}`).set({ contentType, size: data.length, bytes: data, createdAt: Date.now() });
  }
  return { id, url: `/media/${id}` };
}

export async function removeImage(id: string) {
  if (!ID_PATTERN.test(id)) return;
  try {
    if (isLocalStorage()) await fs.unlink(path.join(LOCAL_DIR, id));
    else await (await import("@/lib/firebase/admin")).adminDb().doc(`${COLLECTION}/${id}`).delete();
  } catch {
    /* si ya no existe no pasa nada */
  }
}

export async function readImage(id: string): Promise<{ data: Buffer; contentType: string } | null> {
  if (!ID_PATTERN.test(id) || id.includes("..")) return null;
  try {
    if (isLocalStorage()) {
      const data = await fs.readFile(path.join(LOCAL_DIR, id));
      return { data, contentType: EXT_TYPES[id.split(".").pop() ?? ""] ?? "application/octet-stream" };
    }
    const { adminDb } = await import("@/lib/firebase/admin");
    const snap = await adminDb().doc(`${COLLECTION}/${id}`).get();
    if (!snap.exists) return null;
    const d = snap.data() as { bytes?: Buffer | Uint8Array; contentType?: string };
    if (!d.bytes) return null;
    return { data: Buffer.from(d.bytes), contentType: d.contentType ?? "image/webp" };
  } catch {
    return null;
  }
}
