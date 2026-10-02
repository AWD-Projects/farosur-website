import { Reveal } from "./reveal";

const FIGURES = [
  { value: "2010", label: "nació el taller, en el corazón de Yucatán" },
  { value: "+450 mil", label: "prendas confeccionadas en 15 años" },
  { value: "85 %", label: "del equipo son mujeres" },
];

export function Origenes() {
  return (
    <section id="origenes" className="bg-surface px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <h2 className="section-title">Orígenes</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 font-display text-[clamp(1.25rem,2vw,1.6rem)] italic leading-snug text-muted">
                  Nuestra historia es sobre personas haciendo comunidad.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="space-y-7 text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.8] text-foreground lg:col-span-8">
            <Reveal>
              <p>
                En el año 2010 en el corazón de Yucatán, nació un pequeño taller de 10 personas que comenzó a diseñar,
                confeccionar y comercializar trajes de baño para mujeres. Todo comenzó como un sueño, un sueño que se
                conectó con otros sueños y así surgió Faro Sur, un espacio creativo que consolidó el anhelo de un grupo
                de personas que creyeron que es posible vivir de diseñar y confeccionar trajes de baño.
              </p>
            </Reveal>
            <Reveal>
              <p>
                En 15 años y más de 450 mil prendas confeccionadas, el equipo que formamos Faro Sur, en donde el 85 %
                son mujeres, hemos desarrollado y perfeccionado conocimientos sobre diseño, confección, moldería,
                graduación, telas, habilitaciones, fit, maquinaria, estampación, importación, fibras, tipos de cuerpos
                y un sinfín de sutilezas que se adquieren a lo largo de los años y de la continuidad de trabajo en un
                tipo de producto.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Nuestra historia es también sobre mujeres creando, creyendo en sí mismas, impulsando a sus familias,
                ayudando a crecer la economía local y poniendo en alto el talento mexicano. Así, Faro Sur se consolidó
                como un equipo de mujeres y hombres disfrutando de crecer juntas y juntos.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-10 border-t border-line pt-12 sm:grid-cols-3 lg:mt-24 lg:pt-16">
          {FIGURES.map((f, i) => (
            <li key={f.value}>
              <Reveal delay={i * 0.1}>
                <p className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] leading-none text-foreground">{f.value}</p>
                <p className="mt-3 max-w-[16rem] text-[16px] leading-snug text-muted">{f.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
