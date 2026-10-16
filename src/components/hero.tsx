import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroMedia } from "./hero-media";
import { whatsappLink } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative mt-[72px] overflow-clip bg-background px-5 sm:px-8 lg:mt-[84px] lg:px-12">
      <div className="mx-auto max-w-site pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h1 className="title-hero relative z-10 lg:col-span-7">
            <span className="line-mask"><span style={{ "--d": "0.05s" } as React.CSSProperties}>Trajes de baño</span></span>
            <span className="line-mask"><span style={{ "--d": "0.17s" } as React.CSSProperties}>confeccionados</span></span>
            <span className="line-mask"><span style={{ "--d": "0.29s" } as React.CSSProperties}>en Yucatán</span></span>
          </h1>
          <div className="relative z-10 lg:col-span-5">
            <p className="max-w-lg text-[clamp(1.05rem,1.35vw,1.2rem)] leading-relaxed text-foreground">
              Un espacio destinado a la <strong className="font-semibold text-ink">creación</strong> y{" "}
              <strong className="font-semibold text-ink">desarrollo</strong> de trajes de baño, situado en la{" "}
              <strong className="font-semibold text-ink">Península de Yucatán, México</strong>.
            </p>
            <div className="rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: "0.45s" }}>
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
        <div className="mt-10 lg:mt-14">
          <HeroMedia />
        </div>
      </div>
    </section>
  );
}
