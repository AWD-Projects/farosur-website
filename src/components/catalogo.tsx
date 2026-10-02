import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MaskReveal, Reveal } from "./reveal";

/**
 * Vista previa del catálogo (en desarrollo). Las fotos y códigos son de ejemplo
 * hasta contar con los modelos reales; la página /catalogo aún no existe.
 */
const SAMPLE = [
  { code: "FS-0001", text: "Traje de baño de una pieza", image: "/images/clientes/barocco.jpg", alt: "Traje de baño de una pieza estampado en azul, verde y negro" },
  { code: "FS-0002", text: "Conjunto de dos piezas", image: "/images/clientes/liech-antel.jpg", alt: "Conjunto negro de tiras de dos piezas" },
  { code: "FS-0003", text: "Traje de baño con blusa de malla", image: "/images/clientes/eurosol-concept.jpg", alt: "Traje de baño estampado con blusa de malla azul" },
];

export function Catalogo() {
  return (
    <section id="catalogo" className="bg-clay/25 px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-site items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="section-title">Catálogo</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-[clamp(1.1rem,1.5vw,1.35rem)] leading-snug text-foreground">
              61 modelos para explorar y cotizar en minutos.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/catalogo" className="btn btn-solid group mt-9">
              Explorar el catálogo
              <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
            {SAMPLE.map((m, i) => (
              <li key={m.code} className={i === 2 ? "hidden sm:block" : ""}>
                <MaskReveal delay={i * 0.12}>
                  <div className="relative aspect-[2/3] overflow-hidden rounded-frame bg-clay">
                    <Image
                      src={m.image}
                      alt={m.alt}
                      fill
                      sizes="(min-width:1024px) 22vw, (min-width:640px) 30vw, 46vw"
                      className="object-cover object-top"
                    />
                  </div>
                </MaskReveal>
                <Reveal delay={0.15 + i * 0.1} y={12}>
                  <p className="mt-4 text-[15px] font-semibold tracking-wide text-foreground">{m.code}</p>
                  <p className="mt-1 text-[15px] leading-snug text-muted">{m.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
