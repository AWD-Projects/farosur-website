"use client";

import { useEffect, useState } from "react";

export const QUOTE_STORAGE_KEY = "farosur:cotizacion";
export const QUOTE_EVENT = "farosur:quote";

/** Cantidad de modelos en la cotización, para mostrarla fuera del catálogo (por ejemplo en el encabezado). */
export function useQuoteCount() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(QUOTE_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        setN(Array.isArray(parsed) ? parsed.length : 0);
      } catch {
        setN(0);
      }
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener(QUOTE_EVENT, read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener(QUOTE_EVENT, read);
    };
  }, []);
  return n;
}
