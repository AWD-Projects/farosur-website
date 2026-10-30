"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Toaster } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { buildFilterGroups, valuesOf, type FilterGroup, type FilterKey, type Product } from "@/data/products";
import { Pagination } from "./pagination";
import { EMPTY_SELECTION, FilterPanel, type Selection } from "./filters";
import { ProductCard } from "./product-card";
import { QuickView } from "./quick-view";
import { QuoteBar } from "./quote-bar";
import { QuoteProvider, useQuote } from "./quote-context";
import { QuoteSheet } from "./quote-sheet";

const PAGE_SIZE = 12;

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function matches(groups: FilterGroup[], p: Product, q: string, sel: Selection, skip?: FilterKey) {
  if (q && !norm(`${p.name} ${p.code}`).includes(q)) return false;
  return groups.every(({ key }) => {
    if (key === skip) return true;
    const chosen = sel[key];
    return chosen.length === 0 || valuesOf(p, key).some((v) => chosen.includes(v));
  });
}

function Catalog({ products, groups }: { products: Product[]; groups: FilterGroup[] }) {
  const reduce = useReducedMotion();
  const quote = useQuote();
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState<Selection>(EMPTY_SELECTION);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewing, setViewing] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const q = norm(useDeferredValue(query));

  // Enlaces desde el inicio: /catalogo?tipo=Bikini abre con el filtro puesto y ?modelo=FS-0001 abre ese modelo.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Selection = { categoria: [], tipo: [], genero: [], tallas: [] };
    let any = false;
    for (const g of groups) {
      for (const v of params.getAll(g.key)) {
        if (g.options.includes(v)) {
          next[g.key].push(v);
          any = true;
        }
      }
    }
    if (any) setSel(next);
    const pg = Number.parseInt(params.get("pagina") ?? "", 10);
    if (pg > 1) setPage(pg);
    const code = params.get("modelo");
    if (code && products.some((p) => p.code === code)) setViewing(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = useMemo(() => products.filter((p) => matches(groups, p, q, sel)), [products, groups, q, sel]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const pageItems = useMemo(() => results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE), [results, current]);

  // La página vive en la URL (?pagina=3) para poder compartirla; la página 1 no lleva parámetro.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (current > 1) url.searchParams.set("pagina", String(current));
    else url.searchParams.delete("pagina");
    if (url.href !== window.location.href) window.history.replaceState(null, "", url);
  }, [current]);

  // El modelo abierto vive en la URL (?modelo=CÓDIGO) para poder compartirlo; al cerrar se quita.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (viewing) url.searchParams.set("modelo", viewing);
    else url.searchParams.delete("modelo");
    if (url.href !== window.location.href) window.history.replaceState(null, "", url);
  }, [viewing]);

  const goTo = useCallback((n: number) => {
    setPage(n);
    const el = document.getElementById("listado");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 190;
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 0.6 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const counts = useMemo(() => {
    const out = {} as Record<FilterKey, Record<string, number>>;
    for (const g of groups) {
      out[g.key] = {};
      const pool = products.filter((p) => matches(groups, p, q, sel, g.key));
      for (const opt of g.options) {
        out[g.key][opt] = pool.filter((p) => valuesOf(p, g.key).includes(opt)).length;
      }
    }
    return out;
  }, [products, groups, q, sel]);

  const toggleFilter = useCallback((key: FilterKey, value: string) => {
    setPage(1);
    setSel((s) => ({ ...s, [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value] }));
  }, []);

  const clearAll = () => {
    setPage(1);
    setSel(EMPTY_SELECTION);
    setQuery("");
  };

  const active = groups.flatMap((g) => sel[g.key].map((v) => ({ key: g.key, value: v })));
  const hasFilters = active.length > 0 || query.length > 0;

  const viewIndex = viewing ? results.findIndex((p) => p.code === viewing) : -1;
  const viewProduct = viewing ? products.find((p) => p.code === viewing) ?? null : null;
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
      <div>
        <div className="sticky top-[72px] z-30 bg-background px-5 py-3 sm:px-8 lg:top-[88px] lg:px-12">
          <div className="mx-auto grid max-w-site items-center gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1">
            <div className="relative">
              <label htmlFor="buscar" className="sr-only">
                Buscar por nombre o código
              </label>
              <Search size={18} strokeWidth={1.5} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="buscar"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Buscar por nombre o código"
                autoComplete="off"
                className="block min-h-12 w-full rounded-[2px] border border-ink/40 bg-background pl-11 pr-11 text-[16px] text-ink transition-colors placeholder:text-muted/80 hover:border-ink focus:border-ink [&::-webkit-search-cancel-button]:hidden"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setPage(1);
                    }}
                    aria-label="Borrar búsqueda"
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                    transition={{ duration: reduce ? 0 : 0.15 }}
                    className="absolute right-1.5 top-1/2 -mt-5 inline-flex h-10 w-10 items-center justify-center text-muted hover:text-ink"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <button type="button" onClick={() => setFiltersOpen(true)} className="btn btn-line !px-5 lg:hidden">
              <SlidersHorizontal size={18} strokeWidth={1.5} />
              Filtros{active.length ? ` (${active.length})` : ""}
            </button>
          </div>
        </div>

        <div className="px-5 pb-24 pt-8 sm:px-8 lg:px-12 lg:pb-28 lg:pt-10">
          <div className="mx-auto grid max-w-site lg:grid-cols-[15rem_1fr] lg:gap-12 xl:grid-cols-[16rem_1fr] xl:gap-16">
            <aside aria-label="Filtros" className="hidden lg:block">
              <div data-lenis-prevent className="sticky top-[11rem] max-h-[calc(100dvh-12.5rem)] overflow-y-auto pb-4 pr-3">
                <FilterPanel groups={groups} selection={sel} counts={counts} onToggle={toggleFilter} idPrefix="d" />
              </div>
            </aside>

            <div id="listado" className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-live="polite">
            <p className="flex items-baseline gap-1 text-[15px] text-muted">
              <span className="relative inline-flex h-6 min-w-[1.25rem] overflow-clip">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={results.length}
                    initial={{ y: reduce ? 0 : 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: reduce ? 0 : -14, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.22 }}
                    className="font-semibold tabular-nums text-ink"
                  >
                    {results.length}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>{results.length === products.length ? "modelos" : `de ${products.length} modelos`}</span>
              {pageCount > 1 && <span className="text-muted">· Página {current} de {pageCount}</span>}
            </p>
            <ul className="flex flex-wrap gap-2 lg:hidden">
              <AnimatePresence initial={false}>
                {active.map((a) => (
                  <motion.li
                    key={`${a.key}-${a.value}`}
                    layout={reduce ? false : "position"}
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
                    transition={{ duration: reduce ? 0 : 0.2 }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFilter(a.key, a.value)}
                      aria-label={`Quitar filtro ${a.value}`}
                      className="press inline-flex min-h-9 items-center gap-1.5 rounded-[2px] bg-ink pl-3.5 pr-2.5 text-sm text-white transition-colors hover:bg-brand"
                    >
                      {a.value}
                      <X size={14} strokeWidth={2} />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <AnimatePresence initial={false}>
              {hasFilters && (
                <motion.button
                  type="button"
                  onClick={clearAll}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.2 }}
                  className="min-h-9 text-sm text-ink underline underline-offset-4 hover:text-muted"
                >
                  Limpiar todo
                </motion.button>
              )}
            </AnimatePresence>
          </div>


              <h2 className="sr-only">Modelos</h2>
              {results.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.35 }}
                  className="mt-10 rounded-[2px] border border-dashed border-ink/30 px-6 py-16 text-center"
                >
                  <p className="display text-3xl text-ink">Ningún modelo coincide con tu búsqueda</p>
                  <p className="mx-auto mt-2 max-w-md text-[15px] text-muted">Prueba con otro nombre o código, o quita algún filtro.</p>
                  <button type="button" onClick={clearAll} className="btn btn-line mt-6">
                    Ver los {products.length} modelos
                  </button>
                </motion.div>
              ) : (
                <>
                  <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                      {pageItems.map((p, i) => (
                        <motion.li
                          key={p.code}
                          layout={reduce ? false : "position"}
                          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: reduce ? 1 : 0.96, transition: { duration: reduce ? 0 : 0.18, delay: 0 } }}
                          transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : Math.min(i, 11) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ProductCard product={p} selected={quote.has(p.code)} onToggle={quote.toggle} onOpen={openView} />
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                  <Pagination page={current} pageCount={pageCount} onChange={goTo} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent variant="left" closeLabel="Cerrar filtros">
          <div className="border-b border-line px-6 pb-4 pt-6">
            <DialogTitle className="display text-[2rem] text-ink">Filtros</DialogTitle>
            <DialogDescription className="sr-only">Filtra los modelos por categoría, tipo de prenda, género y talla.</DialogDescription>
          </div>
          <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-6">
            <FilterPanel groups={groups} selection={sel} counts={counts} onToggle={toggleFilter} idPrefix="m" />
          </div>
          <div className="flex gap-3 border-t border-line px-6 py-4">
            <button type="button" onClick={() => {
                setSel(EMPTY_SELECTION);
                setPage(1);
              }} className="btn btn-line !px-5">
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
        total={results.length || products.length}
        selected={viewProduct ? quote.has(viewProduct.code) : false}
        onToggle={quote.toggle}
        onNavigate={navigate}
        onClose={() => {
          const code = viewing;
          setViewing(null);
          // Devuelve el foco a la tarjeta que abrió la vista para no perder el lugar con teclado.
          if (code) {
            window.setTimeout(() => {
              document.querySelector<HTMLElement>(`[aria-label$="código ${code}"]`)?.focus({ preventScroll: true });
            }, 60);
          }
        }}
      />
      <QuoteSheet />
      <QuoteBar />
      <Toaster position="top-center" toastOptions={{ classNames: { toast: "!rounded-[2px] !border-line !bg-background !text-ink" } }} />
    </>
  );
}

export function CatalogApp({ products }: { products: Product[] }) {
  const groups = useMemo(() => buildFilterGroups(products), [products]);
  return (
    <QuoteProvider products={products}>
      <Catalog products={products} groups={groups} />
    </QuoteProvider>
  );
}
