import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { Photo } from "./photo";

/** Vistas del modelo: el nombre de cada fotografía (Principal, Espalda…). */
export function viewsOf(p: Product): { label: string }[] {
  return p.photos?.length ? p.photos.map((_, i) => ({ label: p.photoLabels?.[i] || `Foto ${i + 1}` })) : [{ label: "Sin foto" }];
}

/** Vistas para la tarjeta: la principal y la que aparece al pasar el cursor. */
export function cardViews(p: Product): [number, number] {
  return p.photos?.length ? [0, Math.min(1, p.photos.length - 1)] : [0, 0];
}

export function ProductMedia({ product: p, view, className, sample }: { product: Product; view: number; className?: string; sample?: string }) {
  if (p.photos?.length) {
    return <Photo src={p.photos[Math.min(view, p.photos.length - 1)]} alt={`${p.name}, ${p.tipo.toLowerCase()}`} className={className} />;
  }
  return <div role="img" aria-label={`${p.name}, sin foto`} className={cn("bg-surface", sample, className)} />;
}
