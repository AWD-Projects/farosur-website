import type { Product, Vista } from "@/data/products";
import { cn } from "@/lib/utils";
import { Garment } from "./garment";

export const SAMPLE_VIEWS: { id: Vista; label: string }[] = [
  { id: "principal", label: "Principal" },
  { id: "frente", label: "Frente" },
  { id: "espalda", label: "Espalda" },
  { id: "costado", label: "Costado" },
];

/** Vistas del modelo: sus fotografías o, sin fotos, las cuatro vistas de la ilustración de muestra. */
export function viewsOf(p: Product): { label: string }[] {
  return p.photos?.length ? p.photos.map((_, i) => ({ label: `Foto ${i + 1}` })) : SAMPLE_VIEWS;
}

/** Vistas para la tarjeta: la principal y la que aparece al pasar el cursor. */
export function cardViews(p: Product): [number, number] {
  return p.photos?.length ? [0, Math.min(1, p.photos.length - 1)] : [1, 2];
}

export function ProductMedia({ product: p, view, className, sample }: { product: Product; view: number; className?: string; sample?: string }) {
  if (p.photos?.length) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={p.photos[Math.min(view, p.photos.length - 1)]}
        alt={`${p.name}, ${p.tipo.toLowerCase()}`}
        loading="lazy"
        decoding="async"
        className={cn("object-cover", className)}
      />
    );
  }
  return <Garment tipo={p.tipo} vista={SAMPLE_VIEWS[Math.min(view, 3)].id} className={cn(sample, className)} />;
}
