"use client";

import { memo } from "react";
import { Check, Maximize2, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { Garment } from "./garment";

type Props = {
  product: Product;
  selected: boolean;
  onToggle: (code: string) => void;
  onOpen: (code: string) => void;
};

export const ProductCard = memo(function ProductCard({ product: p, selected, onToggle, onOpen }: Props) {
  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={() => onOpen(p.code)}
        aria-label={`Ver modelo ${p.name}, código ${p.code}`}
        className="relative block aspect-[4/5] w-full overflow-clip rounded-frame bg-surface ring-1 ring-inset ring-line transition-shadow duration-300 hover:ring-clay"
      >
        <Garment tipo={p.tipo} vista="frente" className="absolute inset-0 h-full w-full p-5 transition-opacity duration-500 group-hover:opacity-0" />
        <Garment tipo={p.tipo} vista="espalda" className="absolute inset-0 h-full w-full p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[13px] font-semibold tracking-wide text-foreground">
          {p.code}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <Maximize2 size={16} strokeWidth={1.5} />
        </span>
        {selected && (
          <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-white">
            <Check size={16} strokeWidth={2.2} />
          </span>
        )}
      </button>

      <div className="mt-3 flex-1">
        <h3 className="font-display text-xl leading-tight text-foreground">{p.name}</h3>
        <p className="mt-1 text-[15px] text-muted">
          {p.tipo} · {p.genero}
        </p>
      </div>

      <button
        type="button"
        aria-pressed={selected}
        aria-label={selected ? `En tu cotización: ${p.name}. Quitar` : `Agregar a cotización: ${p.name}`}
        onClick={() => onToggle(p.code)}
        className={cn(
          "mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-3 text-[14px] font-medium transition-colors duration-300 sm:text-[15px]",
          selected
            ? "border-muted bg-muted text-white hover:bg-foreground"
            : "border-muted/60 text-foreground hover:border-foreground hover:bg-foreground hover:text-white",
        )}
      >
        {selected ? <Check size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={1.75} />}
        {selected ? (
          <span>En tu cotización</span>
        ) : (
          <span>
            <span className="sm:hidden">Agregar</span>
            <span className="hidden sm:inline">Agregar a cotización</span>
          </span>
        )}
      </button>
    </article>
  );
});
