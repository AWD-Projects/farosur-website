import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./reveal";
import { Words } from "./words";

export function Servicios() {
  return (
    <section id="servicios" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="section-title">
              <Words mask>Servicios</Words>
            </h2>
            <p className="mt-6 max-w-xs text-[17px] leading-relaxed text-muted">
              <Words delay={0.25}>Elige el que necesitas y nos escribes directo por WhatsApp.</Words>
            </p>
          </div>

          <ul className="lg:col-span-8">
            {SERVICES.map((s, i) => (
              <li key={s.id} className="border-t border-line last:border-b">
                <Reveal delay={i * 0.06} y={16}>
                  <a
                    href={whatsappLink(`Hola, me interesa el servicio de ${s.title.toLowerCase()}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between gap-6 overflow-hidden py-7 sm:py-9"
                  >
                    <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    <h3 className="display text-[clamp(2rem,4.6vw,3.75rem)] leading-none transition-transform duration-500 ease-out group-hover:translate-x-3">
                      {s.title}
                      {s.alias && <span className="mt-2 block whitespace-nowrap sm:ml-4 sm:mt-0 sm:inline align-middle text-[15px] font-normal text-muted font-sans tracking-normal">{s.alias}</span>}
                    </h3>
                    <ArrowUpRight
                      size={34}
                      strokeWidth={1.2}
                      aria-hidden="true"
                      className="shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                    />
                    <span className="sr-only">: pedir información por WhatsApp</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
