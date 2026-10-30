"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { FilterGroup, FilterKey } from "@/data/products";

export type Selection = Record<FilterKey, string[]>;
export const EMPTY_SELECTION: Selection = { categoria: [], tipo: [], genero: [], tallas: [] };

type Props = {
  groups: FilterGroup[];
  selection: Selection;
  counts: Record<FilterKey, Record<string, number>>;
  onToggle: (key: FilterKey, value: string) => void;
  idPrefix: string;
};

/** Filtros por etiqueta: multiselección dentro de cada grupo, con el número de modelos por opción. */
export function FilterPanel({ groups, selection, counts, onToggle, idPrefix }: Props) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <fieldset key={group.key}>
          <legend className="display text-[1.5rem] leading-none">{group.label}</legend>
          <ul className="mt-3 space-y-1">
            {group.options.map((opt) => {
              const id = `${idPrefix}-${group.key}-${opt}`.replace(/\s+/g, "-");
              const checked = selection[group.key].includes(opt);
              const n = counts[group.key][opt] ?? 0;
              const disabled = n === 0 && !checked;
              return (
                <li key={opt}>
                  <label
                    htmlFor={id}
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[2px] px-1 text-[15px] transition-colors hover:bg-clay/20 ${
                      disabled ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    <Checkbox id={id} checked={checked} disabled={disabled} onCheckedChange={() => onToggle(group.key, opt)} />
                    <span className="flex-1 text-ink">{opt}</span>
                    <span className="text-sm tabular-nums text-muted">{n}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}

/** Filtros en fila para escritorio: etiquetas como botones, con el número de modelos por opción. */
export function FilterChips({ groups, selection, counts, onToggle }: Omit<Props, "idPrefix">) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {groups.map((group) => (
        <fieldset key={group.key} className="grid items-center gap-x-8 gap-y-2 py-3 lg:grid-cols-[8rem_1fr]">
          <legend className="float-left mb-0 w-full text-[14px] font-medium text-ink lg:float-none lg:contents">
            <span className="lg:col-start-1">{group.label}</span>
          </legend>
          <ul className="flex flex-wrap gap-2 lg:col-start-2">
            {group.options.map((opt) => {
              const on = selection[group.key].includes(opt);
              const n = counts[group.key][opt] ?? 0;
              const disabled = n === 0 && !on;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    aria-pressed={on}
                    disabled={disabled}
                    onClick={() => onToggle(group.key, opt)}
                    className={`press inline-flex min-h-10 items-center gap-2 rounded-[2px] border px-3.5 text-[14px] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                      on ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"
                    }`}
                  >
                    {opt}
                    <span className={`text-[12px] tabular-nums ${on ? "text-white/70" : "text-muted"}`}>{n}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}
