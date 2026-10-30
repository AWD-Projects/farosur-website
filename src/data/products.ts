/** Tipos del catálogo. Los modelos reales viven en Firestore (colección `products`); aquí no hay datos de ejemplo. */
export type Tipo = string;
export type Genero = string;
export type Categoria = string;

export type Product = {
  code: string;
  name: string;
  description: string;
  tipo: Tipo;
  genero: Genero;
  /** Un modelo puede estar en varias categorías a la vez (p. ej. Playa y Alberca). */
  categoria: Categoria[];
  /** Tallas disponibles, en el orden en que se muestran. */
  tallas?: string[];
  /** URLs de las fotografías (p. ej. /media/abc.webp). Sin fotos se muestra la ilustración de muestra. */
  photos?: string[];
  /** Nombre de cada foto (Principal, Espalda…), en el mismo orden que `photos`. */
  photoLabels?: string[];
};

export type FilterKey = "categoria" | "tipo" | "genero" | "tallas";
export type FilterGroup = { key: FilterKey; label: string; options: string[] };

const FILTER_LABELS: Record<FilterKey, string> = { categoria: "Categoría", tipo: "Tipo de prenda", genero: "Género", tallas: "Talla" };
const PREFERRED_ORDER: Record<FilterKey, string[]> = {
  categoria: ["Playa", "Alberca", "Deportivo"],
  tipo: ["Bikini", "Traje entero", "Short de baño", "Camiseta UV", "Pareo", "Trikini", "Straple", "Top", "Blusa", "Calzón", "Short", "Playera"],
  genero: ["Mujer", "Juniors", "Niñas", "Niño", "Hombre", "Niña"],
  tallas: ["XCH", "CH", "MED", "GDE", "XGD", "2", "4", "6", "8", "10", "12"],
};

/** Valores del modelo para un filtro (categoría puede tener varios). */
export function valuesOf(p: Product, key: FilterKey): string[] {
  const v = key === "tallas" ? p.tallas ?? [] : p[key];
  return (Array.isArray(v) ? v : [v]).filter(Boolean);
}

/** Los filtros se arman con las etiquetas que traen los modelos, así que no hay que tocar código al cambiar la lista. */
export function buildFilterGroups(products: Product[]): FilterGroup[] {
  return (Object.keys(FILTER_LABELS) as FilterKey[]).map((key) => {
    const present = [...new Set(products.flatMap((p) => valuesOf(p, key)))];
    const pref = PREFERRED_ORDER[key];
    const options = present.sort((a, b) => {
      const ia = pref.indexOf(a), ib = pref.indexOf(b);
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return a.localeCompare(b, "es", { numeric: true });
    });
    return { key, label: FILTER_LABELS[key], options };
  });
}
