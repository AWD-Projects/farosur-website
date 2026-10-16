import { CountUp } from "./count-up";
import { Reveal } from "./reveal";
import { Words } from "./words";

const FIGURES = [
  { value: <>2010</>, label: "nació el taller, en el corazón de Yucatán" },
  { value: <CountUp to={450} prefix="+" suffix=" mil" />, label: "prendas confeccionadas en 15 años" },
  { value: <CountUp to={85} suffix=" %" />, label: "del equipo son mujeres" },
];

export function Origenes() {
  return (
    <section id="origenes" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="section-title">
                <Words mask>Orígenes</Words>
              </h2>
              <p className="display mt-8 max-w-sm text-[clamp(1.4rem,2.1vw,1.9rem)] leading-[1.15] !text-muted">
                <Words delay={0.3}>Nuestra historia es sobre personas haciendo comunidad.</Words>
              </p>
            </div>
          </div>

          <div className="space-y-7 text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.8] text-foreground lg:col-span-7">
            <p>
              <Words>
                En el año 2010 en el corazón de Yucatán, nació un pequeño taller de 10 personas que comenzó a diseñar,
                confeccionar y comercializar trajes de baño para mujeres. Todo comenzó como un sueño, un sueño que se
                conectó con otros sueños y así surgió Faro Sur, un espacio creativo que consolidó el anhelo de un grupo
                de personas que creyeron que es posible vivir de diseñar y confeccionar trajes de baño.
              </Words>
            </p>
            <p>
              <Words>
                En 15 años y más de 450 mil prendas confeccionadas, el equipo que formamos Faro Sur, en donde el 85 %
                son mujeres, hemos desarrollado y perfeccionado conocimientos sobre diseño, confección, moldería,
                graduación, telas, habilitaciones, fit, maquinaria, estampación, importación, fibras, tipos de cuerpos
                y un sinfín de sutilezas que se adquieren a lo largo de los años y de la continuidad de trabajo en un
                tipo de producto.
              </Words>
            </p>
            <p>
              <Words>
                Nuestra historia es también sobre mujeres creando, creyendo en sí mismas, impulsando a sus familias,
                ayudando a crecer la economía local y poniendo en alto el talento mexicano. Así, Faro Sur se consolidó
                como un equipo de mujeres y hombres disfrutando de crecer juntas y juntos.
              </Words>
            </p>
          </div>
        </div>

        <ul className="mt-16 grid border-t border-ink/80 sm:grid-cols-3 lg:mt-28">
          {FIGURES.map((f, i) => (
            <li key={f.label} className={`py-10 sm:py-14 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-8 lg:pl-12" : ""}`}>
              <Reveal delay={i * 0.1}>
                <p className="display text-[clamp(3.25rem,7vw,6.5rem)] leading-none">{f.value}</p>
                <p className="mt-4 max-w-[16rem] text-[16px] leading-snug text-muted">{f.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
