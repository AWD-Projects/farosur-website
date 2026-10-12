"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CLIENTS } from "@/lib/content";
import { MaskReveal } from "./reveal";
import { Words } from "./words";

type Client = (typeof CLIENTS)[number];

function ClientCard({ c, i }: { c: Client; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [i === 1 ? 40 : 10, i === 1 ? -40 : -10]);
  return (
    <li ref={ref} className={`group flex flex-col ${i === 1 ? "lg:mt-24" : ""}`}>
      <MaskReveal delay={i * 0.12}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-frame bg-clay">
          <motion.div style={{ y, scale: 1.12 }} className="absolute inset-0">
            <Image
              src={c.image}
              alt={c.alt}
              fill
              sizes="(min-width:1024px) 32vw, (min-width:768px) 48vw, 92vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
            />
          </motion.div>
        </div>
      </MaskReveal>
      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="display text-[clamp(1.75rem,2.6vw,2.4rem)] leading-none">
          <Words mask stagger={0.05}>{c.name}</Words>
        </h3>
        <p className="mt-4 text-[16px] leading-[1.75] text-muted">
          <Words delay={0.15}>{c.text}</Words>
        </p>
        <a
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-[15px] font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
        >
          Visitar {c.linkLabel}
          <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </li>
  );
}

export function Clientes() {
  return (
    <section id="clientes" className="bg-surface px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <h2 className="section-title">
          <Words mask>Clientes</Words>
        </h2>
        <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:items-start">
          {CLIENTS.map((c, i) => (
            <ClientCard key={c.slug} c={c} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
