"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TEAM, type Person } from "@/lib/content";
import { Words } from "./words";

const firstName = (p: Person) => p.name.split(" ")[0];

export function Equipo() {
  const reduce = useReducedMotion();
  const [slug, setSlug] = useState(TEAM[0].slug);
  const panelRef = useRef<HTMLDivElement>(null);
  const person = TEAM.find((p) => p.slug === slug) ?? TEAM[0];

  function select(p: Person) {
    setSlug(p.slug);
    const el = panelRef.current;
    if (el && window.matchMedia("(max-width: 1023px)").matches && el.getBoundingClientRect().top < 72) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }

  return (
    <section id="historias" className="bg-surface px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <h2 className="section-title">
          <Words mask>Historias</Words>
        </h2>

        <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div ref={panelRef} className="scroll-mt-24 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={person.slug}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                  className="grid gap-6 sm:grid-cols-[minmax(0,15rem)_1fr] lg:grid-cols-1"
                >
                  <div className="relative aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-frame bg-clay">
                    <Image src={`/images/equipo/${person.slug}.jpg`} alt={`Retrato de ${person.name}`} fill sizes="352px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="display text-[clamp(2rem,3.4vw,3rem)] leading-none">{person.name}</h3>
                    <p className="mt-3 text-[15px] font-semibold text-ink">
                      {person.role ? `${person.role} · ${person.year}` : `En Faro Sur desde ${person.year}`}
                    </p>
                    <p className="mt-4 max-w-md text-[16.5px] leading-[1.75] text-muted">{person.story}</p>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
              {TEAM.map((p) => {
                const on = p.slug === person.slug;
                return (
                  <li key={p.slug}>
                    <button
                      type="button"
                      onClick={() => select(p)}
                      aria-pressed={on}
                      aria-label={`${p.name}, ${p.role ?? "en el equipo"} desde ${p.year}`}
                      className="group block w-full text-left"
                    >
                      <span
                        className={`relative block aspect-[3/4] overflow-hidden rounded-frame bg-clay transition-shadow duration-300 ${
                          on ? "ring-2 ring-ink ring-offset-2 ring-offset-surface" : "ring-0 group-hover:ring-1 group-hover:ring-muted"
                        }`}
                      >
                        <Image
                          src={`/images/equipo/${p.slug}.jpg`}
                          alt=""
                          fill
                          sizes="(min-width:1024px) 14vw, 30vw"
                          className={`object-cover transition-all duration-700 group-hover:scale-[1.04] ${
                            on ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                          }`}
                        />
                      </span>
                      <span className={`mt-2 block text-[14px] leading-tight ${on ? "font-semibold text-ink" : "text-muted"}`}>
                        {firstName(p)}
                      </span>
                      <span className="block text-[13px] tabular-nums text-muted">{p.year}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
