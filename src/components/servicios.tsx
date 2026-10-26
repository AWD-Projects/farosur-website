import { SERVICES } from "@/lib/content";
import { ServicioItem } from "./servicio-item";
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
              <ServicioItem key={s.id} service={s} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
