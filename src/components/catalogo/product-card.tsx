"use client";

import { memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 0.2;
  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={() => onOpen(p.code)}
        aria-label={`Ver modelo ${p.name}, código ${p.code}`}
        className={cn(
          "press relative block aspect-[4/5] w-full overflow-clip rounded-frame bg-surface ring-1 ring-inset transition-[box-shadow,background-color] duration-300 hover:bg-clay/20",
          selected ? "ring-2 ring-muted" : "ring-line hover:ring-clay",
        )}
      >
        <span className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <Garment tipo={p.tipo} vista="frente" className="absolute inset-0 h-full w-full p-5 transition-opacity duration-500 group-hover:opacity-0" />
          <Garment tipo={p.tipo} vista="espalda" className="absolute inset-0 h-full w-full p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[13px] font-semibold tracking-wide text-foreground">
          {p.code}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <Maximize2 size={16} strokeWidth={1.5} />
        </span>
        <AnimatePresence>
          {selected && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 22, duration: d }}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-white"
            >
              <Check size={16} strokeWidth={2.2} />
            </motion.span>
          )}
        </AnimatePresence>
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
          "btn !min-h-11 mt-4 w-full overflow-clip border !px-3 !text-[14px] sm:!text-[15px]",
          selected
            ? "border-muted bg-muted text-white hover:bg-foreground"
            : "border-muted/60 text-foreground hover:border-foreground hover:bg-foreground hover:text-white",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={selected ? "on" : "off"}
            initial={{ y: reduce ? 0 : 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduce ? 0 : -12, opacity: 0 }}
            transition={{ duration: d * 0.7 }}
            className="inline-flex items-center gap-2"
          >
            {selected ? <Check size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={1.75} />}
            {selected ? (
              "En tu cotización"
            ) : (
              <span>
                <span className="sm:hidden">Agregar</span>
                <span className="hidden sm:inline">Agregar a cotización</span>
              </span>
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </article>
  );
});
