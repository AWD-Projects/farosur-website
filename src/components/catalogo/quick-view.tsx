"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Layers, Palette, Plus, Scissors } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductMedia, viewsOf } from "./media";

type Props = {
  product: Product | null;
  position: number;
  total: number;
  selected: boolean;
  onToggle: (code: string) => void;
  onNavigate: (dir: -1 | 1) => void;
  onClose: () => void;
};

/** Vista ampliada sobre el catálogo (RF04): sin página de detalle independiente. */
export function QuickView({ product: p, position, total, selected, onToggle, onNavigate, onClose }: Props) {
  const reduce = useReducedMotion();
  const [vista, setVista] = useState(0);
  const views = p ? viewsOf(p) : [];

  useEffect(() => {
    setVista(0);
  }, [p?.code]);

  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [p, onNavigate]);

  return (
    <Dialog open={Boolean(p)} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="overflow-y-auto md:overflow-hidden" closeLabel="Cerrar vista ampliada">
        {p && (
          <div className="grid md:grid-cols-12">
            <div className="bg-surface p-4 sm:p-6 md:col-span-7 md:p-8">
              <div className="relative aspect-[4/5] max-h-[52dvh] w-full md:max-h-[calc(100dvh-14rem)]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${p.code}-${vista}`}
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
                    transition={{ duration: reduce ? 0 : 0.2 }}
                    className="h-full w-full"
                  >
                    <ProductMedia product={p} view={vista} className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
                <span className="sr-only" role="status">
                  {views[vista]?.label}
                </span>
              </div>
              <ul className={cn("mt-4 grid gap-2 sm:gap-3", views.length <= 4 ? "grid-cols-4" : "grid-cols-5")}>
                {views.map((v, i) => (
                  <li key={v.label}>
                    <button
                      type="button"
                      aria-pressed={vista === i}
                      aria-label={`Ver ${v.label.toLowerCase()}`}
                      onClick={() => setVista(i)}
                      className="press relative block w-full rounded-lg bg-background p-1.5 ring-1 ring-inset ring-line transition-shadow hover:ring-clay"
                    >
                      {vista === i && (
                        <motion.span
                          layoutId="thumb-ring"
                          transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-inset ring-foreground"
                        />
                      )}
                      <ProductMedia product={p} view={i} className="aspect-square h-auto w-full rounded-md" />
                      <span className="block pb-1 text-center text-[13px] text-muted">{v.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col p-5 sm:p-8 md:col-span-5 md:max-h-[calc(100dvh-2rem)] md:overflow-y-auto">
              <p className="pr-12 text-[15px] font-semibold tracking-wide text-muted">{p.code}</p>
              <DialogTitle className="mt-2 font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.05] text-foreground">
                {p.name}
              </DialogTitle>
              <ul className="mt-4 flex flex-wrap gap-2">
                {[p.categoria, p.tipo, p.genero].map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-foreground">
                    {t}
                  </li>
                ))}
              </ul>
              <DialogDescription className="mt-5 text-[17px] leading-relaxed text-foreground">{p.description}</DialogDescription>

              <ul className="mt-6 space-y-3 border-t border-line pt-6 text-[15px] text-foreground">
                <li className="flex items-start gap-3">
                  <Layers size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted" />
                  Compra mínima de 25 piezas.
                </li>
                <li className="flex items-start gap-3">
                  <Scissors size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted" />
                  Se fabrica sobre pedido.
                </li>
                <li className="flex items-start gap-3">
                  <Palette size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted" />
                  Se hace en otros colores, telas y estampados. La foto del muestrario es en azul rey liso.
                </li>
              </ul>

              <div className="mt-auto pt-8">
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onToggle(p.code)}
                  className={cn("btn w-full", selected ? "btn-solid pulse-ring" : "btn-line")}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={selected ? "on" : "off"}
                      initial={{ y: reduce ? 0 : 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: reduce ? 0 : -12, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.15 }}
                      className="inline-flex items-center gap-2"
                    >
                      {selected ? <Check size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={1.75} />}
                      {selected ? "En tu cotización" : "Agregar a cotización"}
                    </motion.span>
                  </AnimatePresence>
                </button>
                <div className="mt-4 flex items-center justify-between text-sm text-muted">
                  <button
                    type="button"
                    onClick={() => onNavigate(-1)}
                    className="press inline-flex min-h-11 items-center gap-1 pr-3 transition-colors hover:text-foreground"
                    aria-label="Modelo anterior"
                  >
                    <ChevronLeft size={18} strokeWidth={1.5} /> Anterior
                  </button>
                  <span aria-live="polite">
                    {position} de {total}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate(1)}
                    className="press inline-flex min-h-11 items-center gap-1 pl-3 transition-colors hover:text-foreground"
                    aria-label="Modelo siguiente"
                  >
                    Siguiente <ChevronRight size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
