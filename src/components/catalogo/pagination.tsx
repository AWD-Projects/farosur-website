"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

function pagesToShow(page: number, count: number): (number | "gap")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const set = new Set([1, count, page - 1, page, page + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= count).sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("gap");
    out.push(n);
  });
  return out;
}

export function Pagination({ page, pageCount, onChange }: { page: number; pageCount: number; onChange: (n: number) => void }) {
  if (pageCount <= 1) return null;
  const btn = "press inline-flex h-11 min-w-11 items-center justify-center rounded-[2px] border px-3 text-[15px] tabular-nums transition-colors";
  return (
    <nav aria-label="Paginación del catálogo" className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t border-ink/15 pt-8">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Página anterior" className={`${btn} border-line text-ink hover:border-ink disabled:cursor-not-allowed disabled:opacity-40`}>
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>
      {pagesToShow(page, pageCount).map((n, i) =>
        n === "gap" ? (
          <span key={`g${i}`} aria-hidden="true" className="px-1 text-muted">…</span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`Página ${n}`}
            aria-current={n === page ? "page" : undefined}
            className={`${btn} ${n === page ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
          >
            {n}
          </button>
        ),
      )}
      <button type="button" onClick={() => onChange(page + 1)} disabled={page === pageCount} aria-label="Página siguiente" className={`${btn} border-line text-ink hover:border-ink disabled:cursor-not-allowed disabled:opacity-40`}>
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>
    </nav>
  );
}
