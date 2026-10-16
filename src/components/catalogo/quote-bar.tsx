"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ProductMedia, cardViews } from "./media";
import { useQuote } from "./quote-context";

/** Elemento firma: etiqueta de prenda (hang tag) con los modelos elegidos, siempre a un toque de enviar. */
export function QuoteBar() {
  const { codes, get, open, setOpen } = useQuote();
  const reduce = useReducedMotion();
  const items = useMemo(() => codes.map((c) => get(c)).filter((p): p is NonNullable<typeof p> => Boolean(p)), [codes, get]);
  const visible = items.length > 0 && !open;
  const shown = items.slice(-4);

  // Al sumar un modelo, la etiqueta se balancea apenas, como una prenda que se cuelga.
  const swing = useAnimationControls();
  const prev = useRef(items.length);
  useEffect(() => {
    if (!reduce && items.length > prev.current && prev.current > 0) {
      swing.start({ rotate: [0, -2.5, 1.5, -0.6, 0], transition: { duration: 0.9, ease: "easeOut" } });
    }
    prev.current = items.length;
  }, [items.length, reduce, swing]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="tag"
          initial={{ opacity: 0, y: reduce ? 0 : -60, rotate: reduce ? 0 : -6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 30 }}
          transition={{ type: "spring", stiffness: 140, damping: 9, duration: reduce ? 0 : undefined }}
          style={{ transformOrigin: "50% 0%" }}
          className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <motion.div animate={swing} style={{ transformOrigin: "50% 0%" }} className="pointer-events-auto flex w-full max-w-xl items-center gap-4 bg-ink py-3 pl-9 pr-3 text-white shadow-[0_18px_40px_-14px_rgb(20_14_10/0.6)] [clip-path:polygon(22px_0,100%_0,100%_100%,22px_100%,0_50%)]">
            <span aria-hidden="true" className="absolute left-[18px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-background" />
            <ul className="flex -space-x-2" aria-hidden="true">
              <AnimatePresence initial={false} mode="popLayout">
                {shown.map((p) => (
                  <motion.li
                    key={p.code}
                    layout={reduce ? false : "position"}
                    initial={{ scale: reduce ? 1 : 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: reduce ? 1 : 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 26 }}
                    className="h-11 w-9 overflow-clip rounded-[2px] border-2 border-ink bg-surface"
                  >
                    <ProductMedia product={p} view={cardViews(p)[0]} className="h-full w-full" sample="scale-125" />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <p className="min-w-0 flex-1 text-[15px] leading-tight" role="status">
              <span key={items.length} className="bump inline-block origin-left font-semibold">
                {items.length === 1 ? "1 modelo" : `${items.length} modelos`}
              </span>
              <span className="hidden text-white/75 sm:inline"> en tu cotización</span>
            </p>
            <button type="button" onClick={() => setOpen(true)} className="btn btn-light !min-h-11 !px-5">
              Ver mi cotización
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
