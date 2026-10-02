import { Reveal } from "./reveal";

export function Impacto() {
  return (
    <section id="impacto" className="on-night relative overflow-hidden bg-night px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -right-1/4 top-1/2 z-0 aspect-square w-[80rem] -translate-y-1/2">
        <div className="beam animate-sweep" />
      </div>

      <div className="relative z-10 mx-auto max-w-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.06] tracking-[-0.01em]">
                Impacto social positivo
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.8] text-white/90">
                Nos esforzamos por hacer una diferencia en la sociedad, apoyando causas que beneficien y fomenten su
                desarrollo y bienestar. El 100 % de las mujeres que conforman Faro Sur vive en el pueblo de Hunucmá;
                motivo por el cual al ofrecer y mantener los empleos aportan a la comunidad crecimiento económico y
                empleos dignos a muchas mujeres originarias de este hermoso poblado yucateco.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-16 border-t border-white/25 pt-12 lg:mt-24 lg:pt-16">
          <blockquote>
            <p className="max-w-4xl font-display text-[clamp(1.75rem,3.6vw,3.25rem)] italic leading-[1.2]">
              “El trabajo dignifica a las mujeres, les hace dueñas de su propia vida”
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
