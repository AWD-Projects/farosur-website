import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CLIENTS } from "@/lib/content";
import { MaskReveal, Reveal } from "./reveal";

export function Clientes() {
  return (
    <section id="clientes" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="section-title">Clientes</h2>
        </Reveal>

        <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {CLIENTS.map((c, i) => (
            <li key={c.slug} className="group flex flex-col">
              <MaskReveal delay={i * 0.12}>
                <div className="relative aspect-[2/3] overflow-hidden rounded-frame bg-clay">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(min-width:1024px) 32vw, (min-width:768px) 48vw, 92vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </MaskReveal>
              <Reveal delay={0.1} className="mt-7 flex flex-1 flex-col">
                <h3 className="font-display text-2xl leading-tight text-foreground">{c.name}</h3>
                <p className="mt-4 text-[16px] leading-[1.75] text-muted">{c.text}</p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-[15px] font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  Visitar {c.linkLabel}
                  <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
