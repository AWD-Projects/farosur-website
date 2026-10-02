"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TEAM, type Person } from "@/lib/content";
import { Reveal } from "./reveal";

const firstName = (p: Person) => p.name.split(" ")[0];

export function Equipo() {
  const reduce = useReducedMotion();
  const [slug, setSlug] = useState(TEAM[0].slug);
  const panelRef = useRef<HTMLDivElement>(null);

  const person = TEAM.find((p) => p.slug === slug) ?? TEAM[0];

  const years = useMemo(() => {
    const map = new Map<number, Person[]>();
    TEAM.forEach((p) => map.set(p.year, [...(map.get(p.year) ?? []), p]));
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, []);

  function select(p: Person) {
    setSlug(p.slug);
    const el = panelRef.current;
    if (el && window.matchMedia("(max-width: 1023px)").matches && el.getBoundingClientRect().top < 72) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }

  return (
    <section id="historias" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="section-title">Historias</h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Historia seleccionada */}
          <div ref={panelRef} className="scroll-mt-24 lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={person.slug}
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                >
                  <div className="relative aspect-square w-full max-w-[20rem] overflow-hidden rounded-frame bg-clay">
                    <Image
                      src={`/images/equipo/${person.slug}.jpg`}
                      alt={`Retrato de ${person.name}`}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-7 font-display text-3xl leading-tight text-foreground">{person.name}</h3>
                  <p className="mt-2 text-[15px] font-semibold text-foreground">
                    {person.role ? `${person.role} · ${person.year}` : `En Faro Sur desde ${person.year}`}
                  </p>
                  <p className="mt-4 max-w-md text-[16.5px] leading-[1.75] text-muted">{person.story}</p>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

          {/* Línea de tiempo del equipo */}
          <div className="lg:col-span-8">
            <ol className="relative">
              {years.map(([year, people], idx) => {
                const reached = year <= person.year;
                const isLast = idx === years.length - 1;
                return (
                  <li key={year} className="relative grid grid-cols-[4.25rem_1fr] gap-x-4 sm:grid-cols-[5.5rem_1fr] sm:gap-x-6">
                    <div className="relative">
                      <span
                        className={`font-display text-2xl leading-none transition-colors duration-500 sm:text-3xl ${
                          reached ? "text-foreground" : "text-muted"
                        }`}
                      >
                        {year}
                      </span>
                    </div>

                    <div className="relative pb-12 pl-8 sm:pl-10">
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className={`absolute left-[7px] top-2 h-full w-px transition-colors duration-500 ${
                            year < person.year ? "bg-foreground" : "bg-line"
                          }`}
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border transition-colors duration-500 ${
                          reached ? "border-foreground bg-foreground" : "border-line bg-background"
                        }`}
                      />
                      <ul className="flex flex-wrap gap-x-5 gap-y-5">
                        {people.map((p) => {
                          const on = p.slug === person.slug;
                          return (
                            <li key={p.slug}>
                              <button
                                type="button"
                                onClick={() => select(p)}
                                aria-pressed={on}
                                aria-label={`${p.name}, ${p.role ?? "en el equipo"} desde ${p.year}`}
                                className="group flex w-[4.75rem] flex-col items-center gap-2 text-center sm:w-[5.5rem]"
                              >
                                <span
                                  className={`relative block h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full bg-clay ring-offset-2 ring-offset-background transition-shadow duration-300 sm:h-20 sm:w-20 ${
                                    on ? "ring-2 ring-foreground" : "ring-0 group-hover:ring-1 group-hover:ring-muted"
                                  }`}
                                >
                                  <Image
                                    src={`/images/equipo/${p.slug}.jpg`}
                                    alt=""
                                    fill
                                    sizes="80px"
                                    className={`object-cover transition-opacity duration-500 group-hover:opacity-100 ${
                                      reached ? "opacity-100" : "opacity-50"
                                    }`}
                                  />
                                </span>
                                <span
                                  className={`text-[14px] leading-tight ${
                                    on ? "font-semibold text-foreground" : "text-muted"
                                  }`}
                                >
                                  {firstName(p)}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
