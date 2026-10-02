import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { MaskReveal, Reveal } from "./reveal";

/**
 * Vista previa del catálogo (en desarrollo). Las fotos y códigos son de ejemplo
 * hasta contar con los modelos reales; el botón apunta a WhatsApp hasta que exista /catalogo.
 */
const SAMPLE = [
  { code: "FS-0001", text: "Traje de baño de una pieza", image: "/images/clientes/barocco.jpg", alt: "Traje de baño de una pieza estampado en azul, verde y negro" },
  { code: "FS-0002", text: "Conjunto de dos piezas", image: "/images/clientes/liech-antel.jpg", alt: "Conjunto negro de tiras de dos piezas" },
  { code: "FS-0003", text: "Traje de baño con blusa de malla", image: "/images/clientes/eurosol-concept.jpg", alt: "Traje de baño estampado con blusa de malla azul" },
];

const FACTS = [
  { label: "Modelos", value: "61 modelos para consultar" },
  { label: "Filtros", value: "Por nombre, código, categoría, género y tipo de prenda" },
  { label: "Cotizador", value: "Elige modelos y tu solicitud llega a nuestro correo" },
];

export function Catalogo() {
  return (
    <section id="catalogo" className="bg-clay/25 px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-site gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="section-title">Catálogo</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[clamp(1.05rem,1.3vw,1.2rem)] leading-relaxed text-foreground">
              Recorre nuestros modelos, encuentra los que te interesan y pide tu cotización sin llamadas de por medio.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 border-t border-foreground/15">
              {FACTS.map((f) => (
                <div key={f.label} className="grid gap-1 border-b border-foreground/15 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                  <dt className="text-[15px] font-semibold text-foreground">{f.label}</dt>
                  <dd className="text-[16px] leading-snug text-muted">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[14px] text-muted">Compra mínima de 25 piezas. Sin precios en el catálogo.</p>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={whatsappLink("Hola, me gustaría conocer el catálogo de Faro Sur y pedir una cotización.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid group mt-9"
            >
              Pedir el catálogo
              <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
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
