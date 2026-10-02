import { ArrowUpRight, GraduationCap, Ruler, Shirt, Users } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./reveal";

const ICONS = { users: Users, ruler: Ruler, shirt: Shirt, graduation: GraduationCap } as const;

export function Servicios() {
  return (
    <section id="servicios" className="bg-surface px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="section-title">Servicios</h2>
            </Reveal>
          </div>

          <ul className="lg:col-span-8">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.id} className="border-t border-line last:border-b">
                  <Reveal delay={i * 0.06} y={16}>
                    <a
                      href={whatsappLink(`Hola, me interesa el servicio de ${s.title.toLowerCase()} de Faro Sur.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-5 py-7 sm:gap-8 sm:py-9"
                    >
                      <Icon size={36} strokeWidth={1.25} className="shrink-0 text-muted" aria-hidden="true" />
                      <span className="flex-1 font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-foreground">
                        {s.title}
                      </span>
                      <span className="flex items-center gap-2 text-[15px] text-muted transition-colors group-hover:text-foreground">
                        <span className="hidden sm:inline">Consultar</span>
                        <ArrowUpRight
                          size={22}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
