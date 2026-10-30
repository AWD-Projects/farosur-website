import "server-only";
import { unstable_cache } from "next/cache";
import type { Product } from "@/data/products";
import { hasFirebaseAdmin } from "@/lib/firebase/config";

/**
 * Modelos del catálogo: los documentos de la colección `products` de Firestore.
 * Si la colección está vacía o Firebase falla, la lista sale vacía y las páginas muestran el aviso de catálogo no disponible.
 */
export type Catalog = { products: Product[]; source: "firestore" | "vacio" };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
/** Acepta una lista o un texto separado por guiones o comas ("Playa - Alberca"). */
const list = (v: unknown): string[] =>
  (Array.isArray(v) ? v.map(str) : str(v).split(/\s+-\s+|,|\|/).map((x) => x.trim())).filter(Boolean);

async function fromFirestore(): Promise<Product[]> {
  const { adminDb } = await import("@/lib/firebase/admin");
  const snap = await adminDb().collection("products").get();
  const rows = snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) }))
    .filter((d) => (d as { active?: unknown }).active !== false);
  rows.sort((a, b) => {
    const oa = Number((a as { order?: unknown }).order ?? 1e9), ob = Number((b as { order?: unknown }).order ?? 1e9);
    return oa - ob || a.id.localeCompare(b.id);
  });
  const out: Product[] = [];
  for (const r of rows as Array<Record<string, unknown> & { id: string }>) {
    const code = str(r.code) || r.id;
    const name = str(r.name);
    if (!code || !name) continue;
    const tallas = list(r.tallas);
    const labels = list(r.photoLabels);
    const photos = Array.isArray(r.photos) ? r.photos.filter((x): x is string => typeof x === "string" && x.startsWith("/media/")) : [];
    out.push({
      code,
      name,
      description: str(r.description),
      tipo: str(r.tipo),
      genero: str(r.genero),
      categoria: list(r.categoria),
      ...(tallas.length ? { tallas } : {}),
      ...(photos.length ? { photos, ...(labels.length === photos.length ? { photoLabels: labels } : {}) } : {}),
    });
  }
  return out;
}

const load = unstable_cache(
  async (): Promise<Catalog> => {
    if (!hasFirebaseAdmin()) throw new Error("Firebase no está configurado.");
    const products = await fromFirestore();
    return { products, source: products.length ? "firestore" : "vacio" };
  },
  ["catalog-v2"],
  { revalidate: 300, tags: ["catalog"] },
);

/** Un fallo de Firebase no se guarda en caché: el siguiente visitante vuelve a intentarlo. */
export async function getCatalog(): Promise<Catalog> {
  try {
    return await load();
  } catch (e) {
    console.error("No se pudo leer el catálogo de Firestore.", e);
    return { products: [], source: "vacio" };
  }
}

export async function getProductByCode(code: string) {
  return (await getCatalog()).products.find((p) => p.code === code);
}
