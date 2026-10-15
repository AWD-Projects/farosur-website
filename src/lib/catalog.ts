import "server-only";
import { unstable_cache } from "next/cache";
import { PRODUCTS, type Product } from "@/data/products";
import { hasFirebaseAdmin } from "@/lib/firebase/config";

/**
 * Modelos del catálogo. Si Firestore tiene documentos en `products`, esos son el catálogo;
 * si la colección está vacía (o Firebase no está configurado) se usan los modelos de muestra.
 */
export type Catalog = { products: Product[]; source: "firestore" | "muestra" };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

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
    const photos = Array.isArray(r.photos) ? r.photos.filter((x): x is string => typeof x === "string" && x.startsWith("/media/")) : [];
    out.push({
      code,
      name,
      description: str(r.description),
      tipo: str(r.tipo),
      genero: str(r.genero),
      categoria: str(r.categoria),
      ...(photos.length ? { photos } : {}),
    });
  }
  return out;
}

const load = unstable_cache(
  async (): Promise<Catalog> => {
    if (hasFirebaseAdmin()) {
      try {
        const products = await fromFirestore();
        if (products.length > 0) return { products, source: "firestore" };
      } catch (e) {
        console.error("No se pudo leer el catálogo de Firestore; se usan los modelos de muestra.", e);
      }
    }
    return { products: PRODUCTS, source: "muestra" };
  },
  ["catalog-v1"],
  { revalidate: 300, tags: ["catalog"] },
);

export const getCatalog = () => load();

export async function getProductByCode(code: string) {
  return (await getCatalog()).products.find((p) => p.code === code);
}
