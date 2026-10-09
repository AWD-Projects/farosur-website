/**
 * MODELOS DE MUESTRA (supuesto).
 * Los 61 modelos reales, sus nombres, descripciones, etiquetas y fotografías las entrega
 * Faro Sur (PRD, sección 10). Mientras tanto, esta lista define la estructura y permite
 * probar filtros, búsqueda y cotizador. En producción se reemplaza por la base de datos.
 */
export type Tipo = string;
export type Genero = string;
export type Categoria = string;
export type Vista = "principal" | "frente" | "espalda" | "costado";

export type Product = {
  code: string;
  name: string;
  description: string;
  tipo: Tipo;
  genero: Genero;
  categoria: Categoria;
  /** URLs de las fotografías (p. ej. /media/abc.webp). Sin fotos se muestra la ilustración de muestra. */
  photos?: string[];
};

export type FilterKey = "categoria" | "tipo" | "genero";
export type FilterGroup = { key: FilterKey; label: string; options: string[] };

const FILTER_LABELS: Record<FilterKey, string> = { categoria: "Categoría", tipo: "Tipo de prenda", genero: "Género" };
const PREFERRED_ORDER: Record<FilterKey, string[]> = {
  categoria: ["Playa", "Alberca", "Deportivo"],
  tipo: ["Bikini", "Traje entero", "Short de baño", "Camiseta UV", "Pareo"],
  genero: ["Mujer", "Hombre", "Niña", "Niño"],
};

/** Los filtros se arman con las etiquetas que traen los modelos, así que no hay que tocar código al cambiar la lista. */
export function buildFilterGroups(products: Product[]): FilterGroup[] {
  return (Object.keys(FILTER_LABELS) as FilterKey[]).map((key) => {
    const present = [...new Set(products.map((p) => p[key]).filter(Boolean))];
    const pref = PREFERRED_ORDER[key];
    const options = present.sort((a, b) => {
      const ia = pref.indexOf(a), ib = pref.indexOf(b);
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return a.localeCompare(b, "es");
    });
    return { key, label: FILTER_LABELS[key], options };
  });
}

const NAMES = [
  "Celestún", "Progreso", "Sisal", "Telchac", "Dzilam", "Chuburná", "Chicxulub", "Río Lagartos",
  "Holbox", "Xcambó", "Uaymitún", "Chelem", "Ría", "Manglar", "Cenote", "Henequén",
  "Flamenco", "Garza", "Tortuga", "Caracola", "Marea", "Brisa", "Arrecife", "Duna",
  "Sol de Mérida", "Rumbo", "Faro", "Costa", "Bahía", "Ola", "Salitre", "Coral",
  "Isla", "Cayo", "Palma", "Mangle", "Playa Norte", "Puerto", "Zafiro", "Nácar",
  "Tinta", "Ceiba", "Pitahaya", "Chaya", "Mamey", "Zapote", "Anona", "Tamarindo",
  "Tulum", "Cozumel", "Bacalar", "Isla Mujeres", "Xel-Há", "Siankaan", "Ek Balam", "Izamal",
  "Valladolid", "Motul", "Dzemul", "Telchac Puerto", "Sabancuy",
];

type Spec = [Tipo, Genero, number, string[]];
const SPECS: Spec[] = [
  ["Bikini", "Mujer", 11, ["Top de triángulo con tiras al cuello y calzón con amarres laterales.", "Top de media copa y calzón de corte alto.", "Top deportivo de tirantes cruzados y calzón de corte medio."]],
  ["Bikini", "Niña", 3, ["Conjunto de dos piezas con tirantes ajustables y cintura elástica."]],
  ["Traje entero", "Mujer", 10, ["Una pieza con escote redondo y espalda descubierta.", "Una pieza con tirantes anchos, forro completo y corte clásico.", "Una pieza con aberturas laterales y espalda cruzada."]],
  ["Traje entero", "Niña", 4, ["Una pieza con tirantes anchos, forro completo y cierre en la espalda."]],
  ["Short de baño", "Hombre", 9, ["Short con cintura elástica, cordón y bolsillos laterales.", "Short largo con malla interior y bolsillo trasero con cierre."]],
  ["Short de baño", "Niño", 4, ["Short con cintura elástica, cordón y malla interior."]],
  ["Camiseta UV", "Mujer", 3, ["Camiseta de manga larga con protección UV y cuello redondo."]],
  ["Camiseta UV", "Hombre", 3, ["Camiseta de manga larga con protección UV y costuras planas."]],
  ["Camiseta UV", "Niña", 2, ["Camiseta de manga larga con protección UV y ajuste cómodo."]],
  ["Camiseta UV", "Niño", 2, ["Camiseta de manga larga con protección UV y costuras planas."]],
  ["Pareo", "Mujer", 10, ["Pareo largo con amarre a la cintura.", "Vestido de playa con tirantes y falda amplia."]],
];

function categoriaFor(tipo: Tipo, i: number): Categoria {
  if (tipo === "Pareo") return "Playa";
  if (tipo === "Camiseta UV") return i % 2 === 0 ? "Deportivo" : "Playa";
  return (["Playa", "Alberca", "Deportivo"] as const)[i % 3];
}

export const PRODUCTS: Product[] = (() => {
  const list: Product[] = [];
  let n = 0;
  for (const [tipo, genero, count, descs] of SPECS) {
    for (let k = 0; k < count; k++) {
      const name = NAMES[n % NAMES.length];
      list.push({
        code: `FS-${String(n + 1).padStart(4, "0")}`,
        name,
        description: descs[k % descs.length],
        tipo,
        genero,
        categoria: categoriaFor(tipo, n),
      });
      n++;
    }
  }
  // Mezcla determinista de tipos para que el muestrario no salga agrupado por prenda.
  // 61 es primo, así que i*7 mod 61 recorre todas las posiciones una sola vez.
  return list.map((_, i) => list[(i * 7) % list.length]).map((p, i) => ({
    ...p,
    code: `FS-${String(i + 1).padStart(4, "0")}`,
  }));
})();

