"use client";

import type { Product } from "@/data/products";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "farosur:cotizacion";

type Ctx = {
  codes: string[];
  products: Product[];
  get: (code: string) => Product | undefined;
  has: (code: string) => boolean;
  toggle: (code: string) => void;
  remove: (code: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const QuoteCtx = createContext<Ctx | null>(null);

export function QuoteProvider({ children, products }: { children: ReactNode; products: Product[] }) {
  const valid = useMemo(() => products.map((p) => p.code), [products]);
  const [codes, setCodes] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCodes(parsed.filter((c) => typeof c === "string" && valid.includes(c)));
      }
    } catch {}
    setReady(true);
  }, [valid]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
    } catch {}
  }, [codes, ready]);

  const toggle = useCallback(
    (code: string) => setCodes((c) => (c.includes(code) ? c.filter((x) => x !== code) : [...c, code])),
    [],
  );
  const remove = useCallback((code: string) => setCodes((c) => c.filter((x) => x !== code)), []);
  const clear = useCallback(() => setCodes([]), []);

  const value = useMemo<Ctx>(
    () => ({
      codes,
      products,
      get: (code) => products.find((p) => p.code === code),
      has: (code) => codes.includes(code),
      toggle,
      remove,
      clear,
      open,
      setOpen,
    }),
    [codes, products, toggle, remove, clear, open],
  );
  return <QuoteCtx.Provider value={value}>{children}</QuoteCtx.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteCtx);
  if (!ctx) throw new Error("useQuote debe usarse dentro de QuoteProvider");
  return ctx;
}
