import { ArrowRight } from "lucide-react";
import { MaskReveal } from "./reveal";
import { VideoFrame } from "./video-frame";
import { whatsappLink } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="px-5 pb-16 pt-[104px] sm:px-8 sm:pb-20 lg:px-12 lg:pb-24 lg:pt-[136px]">
      <div className="mx-auto grid max-w-site items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="rise">
            <h1 className="font-display text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.04] tracking-[-0.015em] text-foreground">
              Trajes de baño <em className="italic">confeccionados</em> en Yucatán
            </h1>
          </div>
          <div className="rise" style={{ animationDelay: "120ms" }}>
            <p className="mt-7 max-w-xl text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-muted">
              Un espacio destinado a la <strong className="font-semibold text-foreground">creación</strong> y{" "}
              <strong className="font-semibold text-foreground">desarrollo</strong> de trajes de baño, situado en la{" "}
              <strong className="font-semibold text-foreground">Península de Yucatán, México</strong>
            </p>
          </div>
          <div className="rise" style={{ animationDelay: "240ms" }}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={whatsappLink("Hola, vi su sitio y me gustaría platicar sobre la confección de trajes de baño.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="#historias"
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-foreground"
              >
                <span className="border-b border-foreground/40 pb-0.5 transition-colors group-hover:border-foreground">
                  Conocer al equipo
                </span>
                <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <MaskReveal>
            <div className="relative aspect-[4/5] w-full max-w-md sm:mx-0 mx-auto overflow-hidden rounded-frame lg:ml-auto lg:max-w-none">
              <VideoFrame />
            </div>
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}
