"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ClipboardList, Search, SlidersHorizontal, X } from "lucide-react";
import { Toaster } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { FILTER_GROUPS, PRODUCTS, type FilterKey, type Product } from "@/data/products";
import { EMPTY_SELECTION, FilterPanel, type Selection } from "./filters";
import { ProductCard } from "./product-card";
import { QuickView } from "./quick-view";
import { QuoteBar } from "./quote-bar";
import { QuoteProvider, useQuote } from "./quote-context";
import { QuoteSheet } from "./quote-sheet";

const VALID_CODES = PRODUCTS.map((p) => p.code);

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function matches(p: Product, q: string, sel: Selection, skip?: FilterKey) {
  if (q && !norm(`${p.name} ${p.code}`).includes(q)) return false;
  return FILTER_GROUPS.every(({ key }) => {
    if (key === skip) return true;
    const chosen = sel[key];
    return chosen.length === 0 || chosen.includes(p[key === "tipo" ? "tipo" : key === "genero" ? "genero" : "categoria"]);
  });
}

function Catalog() {
  const reduce = useReducedMotion();
  const quote = useQuote();
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState<Selection>(EMPTY_SELECTION);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewing, setViewing] = useState<string | null>(null);

  const q = norm(useDeferredValue(query));

  const results = useMemo(() => PRODUCTS.filter((p) => matches(p, q, sel)), [q, sel]);

  const counts = useMemo(() => {
    const out = {} as Record<FilterKey, Record<string, number>>;
    for (const g of FILTER_GROUPS) {
      out[g.key] = {};
      const pool = PRODUCTS.filter((p) => matches(p, q, sel, g.key));
      for (const opt of g.options) {
        out[g.key][opt] = pool.filter((p) => p[g.key === "tipo" ? "tipo" : g.key === "genero" ? "genero" : "categoria"] === opt).length;
      }
    }
    return out;
  }, [q, sel]);

  const toggleFilter = useCallback((key: FilterKey, value: string) => {
    setSel((s) => ({ ...s, [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value] }));
  }, []);

  const clearAll = () => {
    setSel(EMPTY_SELECTION);
    setQuery("");
  };

  const active = FILTER_GROUPS.flatMap((g) => sel[g.key].map((v) => ({ key: g.key, value: v })));
  const hasFilters = active.length > 0 || query.length > 0;

  const viewIndex = viewing ? results.findIndex((p) => p.code === viewing) : -1;
  const viewProduct = viewing ? PRODUCTS.find((p) => p.code === viewing) ?? null : null;
  const navigate = useCallback(
    (dir: -1 | 1) => {
      if (!viewing || results.length === 0) return;
      const i = results.findIndex((p) => p.code === viewing);
      const next = results[(Math.max(i, 0) + dir + results.length) % results.length];
      setViewing(next.code);
    },
    [viewing, results],
  );

  const openView = useCallback((code: string) => setViewing(code), []);

  return (
    <>
      <div className="px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="mx-auto grid max-w-site gap-x-10 gap-y-6 lg:grid-cols-[15rem_1fr] xl:grid-cols-[16rem_1fr] xl:gap-x-14">
        <aside aria-label="Filtros" className="hidden lg:block">
          <div className="sticky top-[112px] max-h-[calc(100dvh-136px)] overflow-y-auto pr-2" data-lenis-prevent>
            <FilterPanel selection={sel} counts={counts} onToggle={toggleFilter} idPrefix="d" />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-full flex-1 sm:min-w-[14rem]">
              <label htmlFor="buscar" className="sr-only">
                Buscar por nombre o código
              </label>
              <Search size={18} strokeWidth={1.5} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="buscar"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre o código"
                autoComplete="off"
                className="block min-h-12 w-full rounded-full border border-muted/50 bg-background pl-11 pr-11 text-[16px] text-foreground transition-colors placeholder:text-muted/80 hover:border-foreground focus:border-foreground [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Borrar búsqueda"
                  className="absolute right-1.5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-foreground"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              )}
            </div>

            <button type="button" onClick={() => setFiltersOpen(true)} className="btn btn-line !min-h-12 !px-5 lg:hidden">
              <SlidersHorizontal size={18} strokeWidth={1.5} />
              Filtros{active.length ? ` (${active.length})` : ""}
            </button>

            <button type="button" onClick={() => quote.setOpen(true)} className="btn btn-solid !min-h-12 !px-5">
              <ClipboardList size={18} strokeWidth={1.5} />
              <span>Mi cotización</span>
              <span className="min-w-6 rounded-full bg-white/20 px-1.5 text-center text-sm tabular-nums">{quote.codes.length}</span>
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2" aria-live="polite">
            <p className="text-[15px] text-muted">
              {results.length === PRODUCTS.length
                ? `${PRODUCTS.length} modelos`
                : `${results.length} de ${PRODUCTS.length} modelos`}
            </p>
            {active.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {active.map((a) => (
                  <li key={`${a.key}-${a.value}`}>
                    <button
                      type="button"
                      onClick={() => toggleFilter(a.key, a.value)}
                      aria-label={`Quitar filtro ${a.value}`}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-clay/30 pl-3.5 pr-2.5 text-sm text-foreground transition-colors hover:bg-clay/50"
                    >
                      {a.value}
                      <X size={14} strokeWidth={2} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {hasFilters && (
              <button type="button" onClick={clearAll} className="min-h-9 text-sm text-foreground underline underline-offset-4 hover:text-muted">
                Limpiar todo
              </button>
            )}
          </div>

          <h2 className="sr-only">Modelos</h2>
          {results.length === 0 ? (
            <div className="mt-10 rounded-frame border border-dashed border-clay px-6 py-16 text-center">
              <p className="font-display text-2xl text-foreground">Ningún modelo coincide con tu búsqueda</p>
              <p className="mx-auto mt-2 max-w-md text-[15px] text-muted">Prueba con otro nombre o código, o quita algún filtro.</p>
              <button type="button" onClick={clearAll} className="btn btn-line mt-6">
                Ver los {PRODUCTS.length} modelos
              </button>
            </div>
          ) : (
            <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence initial={false} mode="popLayout">
                {results.map((p) => (
                  <motion.li
                    key={p.code}
                    className="[contain-intrinsic-size:auto_440px] [content-visibility:auto]"
                    layout={reduce ? false : "position"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                  >
                    <ProductCard product={p} selected={quote.has(p.code)} onToggle={quote.toggle} onOpen={openView} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
      </div>

      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent variant="left" closeLabel="Cerrar filtros">
          <div className="border-b border-line px-6 pb-4 pt-6">
            <DialogTitle className="font-display text-[1.75rem] text-foreground">Filtros</DialogTitle>
            <DialogDescription className="sr-only">Filtra los modelos por categoría, tipo de prenda y género.</DialogDescription>
          </div>
          <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-6">
            <FilterPanel selection={sel} counts={counts} onToggle={toggleFilter} idPrefix="m" />
          </div>
          <div className="flex gap-3 border-t border-line px-6 py-4">
            <button type="button" onClick={() => setSel(EMPTY_SELECTION)} className="btn btn-line !px-5">
              Limpiar
            </button>
            <button type="button" onClick={() => setFiltersOpen(false)} className="btn btn-solid flex-1">
              Ver {results.length} {results.length === 1 ? "modelo" : "modelos"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <QuickView
        product={viewProduct}
        position={Math.max(viewIndex, 0) + 1}
        total={results.length || PRODUCTS.length}
        selected={viewProduct ? quote.has(viewProduct.code) : false}
        onToggle={quote.toggle}
        onNavigate={navigate}
        onClose={() => setViewing(null)}
      />
      <QuoteSheet />
      <QuoteBar />
      <Toaster position="top-center" toastOptions={{ classNames: { toast: "!rounded-frame !border-line !bg-background !text-foreground" } }} />
    </>
  );
}

export function CatalogApp() {
  return (
    <QuoteProvider valid={VALID_CODES}>
      <Catalog />
    </QuoteProvider>
  );
}
