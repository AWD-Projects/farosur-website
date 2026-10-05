"use client";

import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { getProduct } from "@/data/products";
import { Garment } from "./garment";
import { useQuote } from "./quote-context";

/** Elemento firma: barra flotante con los modelos elegidos, siempre a un toque de enviar. */
export function QuoteBar() {
  const { codes, open, setOpen } = useQuote();
  const reduce = useReducedMotion();
  const items = useMemo(() => codes.map((c) => getProduct(c)).filter((p): p is NonNullable<typeof p> => Boolean(p)), [codes]);
  const visible = items.length > 0 && !open;
  const shown = items.slice(-4);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="bar"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <div className="pointer-events-auto flex w-full max-w-xl items-center gap-3 rounded-full border border-line bg-background py-2 pl-3 pr-2 shadow-[0_12px_40px_-12px_rgb(60_50_40/0.45)]">
            <ul className="flex -space-x-3" aria-hidden="true">
              {shown.map((p) => (
                <li key={p.code} className="h-11 w-11 overflow-clip rounded-full border-2 border-background bg-surface">
                  <Garment tipo={p.tipo} vista="frente" className="h-full w-full scale-125" />
                </li>
              ))}
            </ul>
            <p className="min-w-0 flex-1 text-[15px] leading-tight text-foreground" role="status">
              <span className="font-semibold">{items.length === 1 ? "1 modelo" : `${items.length} modelos`}</span>
              <span className="hidden text-muted sm:inline"> en tu cotización</span>
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn btn-solid shimmer relative !min-h-11 overflow-clip !px-5"
            >
              <ClipboardList size={18} strokeWidth={1.5} />
              Ver mi cotización
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
