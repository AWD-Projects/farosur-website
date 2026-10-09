import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual, randomBytes } from "node:crypto";
import { MAX_STORED_BYTES, saveImage } from "@/lib/storage/images";

export const runtime = "nodejs";

const TYPES: Record<string, string> = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" };

/** Verifica los primeros bytes: el Content-Type lo manda el cliente y no es de fiar. */
function matchesSignature(b: Buffer, type: string) {
  if (type === "image/jpeg") return b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  if (type === "image/png") return b.length > 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (type === "image/webp") return b.length > 12 && b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP";
  return false;
}

function authorized(req: NextRequest) {
  const token = process.env.ADMIN_UPLOAD_TOKEN;
  if (!token) return false;
  const given = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(given);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

/**
 * Sube una foto ya comprimida en el navegador.
 * Protegida con ADMIN_UPLOAD_TOKEN mientras no exista el panel con inicio de sesión.
 */
export async function POST(req: NextRequest) {
  if (!authorized(req)) return fail("No autorizado.", 401);

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return fail("No llegó ninguna foto.", 400);

  const ext = TYPES[file.type];
  if (!ext) return fail("Usa una foto JPG, PNG o WebP.", 415);
  if (file.size > MAX_STORED_BYTES) return fail("La foto pesa demasiado.", 413);

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!matchesSignature(bytes, file.type)) return fail("Ese archivo no es una foto válida.", 415);

  const id = `${Date.now().toString(36)}-${randomBytes(5).toString("hex")}.${ext}`;
  const image = await saveImage(id, bytes, file.type);
  return NextResponse.json({ ok: true, image });
}
