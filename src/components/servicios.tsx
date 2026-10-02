import { GraduationCap, Ruler, Shirt, Users } from "lucide-react";
import { SERVICES } from "@/lib/content";
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
                    <div className="flex items-center gap-5 py-7 sm:gap-8 sm:py-9">
                      <Icon size={36} strokeWidth={1.25} className="shrink-0 text-muted" aria-hidden="true" />
                      <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-tight text-foreground">
                        {s.title}
                      </h3>
                    </div>
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
