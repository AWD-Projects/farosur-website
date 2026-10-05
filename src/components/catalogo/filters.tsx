"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FILTER_GROUPS, type FilterKey } from "@/data/products";

export type Selection = Record<FilterKey, string[]>;
export const EMPTY_SELECTION: Selection = { categoria: [], tipo: [], genero: [] };

type Props = {
  selection: Selection;
  counts: Record<FilterKey, Record<string, number>>;
  onToggle: (key: FilterKey, value: string) => void;
  idPrefix: string;
};

/** Filtros por etiqueta: multiselección dentro de cada grupo, con el número de modelos por opción. */
export function FilterPanel({ selection, counts, onToggle, idPrefix }: Props) {
  return (
    <div className="space-y-8">
      {FILTER_GROUPS.map((group) => (
        <fieldset key={group.key}>
          <legend className="font-display text-xl text-foreground">{group.label}</legend>
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
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-1 text-[15px] transition-colors hover:bg-clay/20 ${
                      disabled ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    <Checkbox id={id} checked={checked} disabled={disabled} onCheckedChange={() => onToggle(group.key, opt)} />
                    <span className="flex-1 text-foreground">{opt}</span>
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
