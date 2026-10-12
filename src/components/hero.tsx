import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroMedia } from "./hero-media";
import { whatsappLink } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="grain relative mt-[72px] overflow-clip bg-background px-5 sm:px-8 lg:mt-[84px] lg:px-12">
      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-site items-center gap-10 py-10 sm:py-14 lg:min-h-[calc(100svh-84px)] lg:grid-cols-12 lg:gap-12 lg:py-12">
        <div className="relative z-10 lg:col-span-7">
          <h1 className="title-hero">
            <span className="line-mask"><span style={{ "--d": "0.05s" } as React.CSSProperties}>Trajes de baño</span></span>
            <span className="line-mask"><span style={{ "--d": "0.17s" } as React.CSSProperties}>confeccionados</span></span>
            <span className="line-mask"><span style={{ "--d": "0.29s" } as React.CSSProperties}>en Yucatán</span></span>
          </h1>
          <div className="rise" style={{ animationDelay: "0.55s" }}>
            <p className="mt-8 max-w-lg text-[clamp(1.05rem,1.35vw,1.2rem)] leading-relaxed text-foreground">
              Un espacio destinado a la <strong className="font-semibold text-ink">creación</strong> y{" "}
              <strong className="font-semibold text-ink">desarrollo</strong> de trajes de baño, situado en la{" "}
              <strong className="font-semibold text-ink">Península de Yucatán, México</strong>.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/catalogo" className="btn btn-solid group">
                Explorar el catálogo
                <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappLink("Hola, vi su sitio y me gustaría platicar sobre la confección de trajes de baño.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="mx-auto max-w-md lg:max-w-none">
            <HeroMedia />
          </div>
        </div>
      </div>
    </section>
  );
}
