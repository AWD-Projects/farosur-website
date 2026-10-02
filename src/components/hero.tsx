import { ArrowRight } from "lucide-react";
import { VideoFrame } from "./video-frame";
import { whatsappLink } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="on-night relative mt-[72px] flex h-[calc(100svh-72px)] min-h-[560px] items-end overflow-clip bg-night lg:mt-[88px] lg:h-[calc(100svh-88px)]"
    >
      <VideoFrame />
      {/* Velo para garantizar contraste del texto sobre cualquier cuadro del video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20"
      />

      <div className="relative z-10 w-full px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-site">
          <div className="rise">
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.04] tracking-[-0.015em] text-white">
              Trajes de baño <em className="italic">confeccionados</em> en Yucatán
            </h1>
          </div>
          <div className="rise" style={{ animationDelay: "120ms" }}>
            <p className="mt-6 max-w-xl text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-white/90">
              Un espacio destinado a la <strong className="font-semibold text-white">creación</strong> y{" "}
              <strong className="font-semibold text-white">desarrollo</strong> de trajes de baño, situado en la{" "}
              <strong className="font-semibold text-white">Península de Yucatán, México</strong>
            </p>
          </div>
          <div className="rise" style={{ animationDelay: "240ms" }}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={whatsappLink("Hola, vi su sitio y me gustaría platicar sobre la confección de trajes de baño.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-foreground hover:bg-surface"
              >
                Escribir por WhatsApp
              </a>
              <a href="#historias" className="group inline-flex items-center gap-2 text-[15px] font-medium text-white">
                <span className="border-b border-white/50 pb-0.5 transition-colors group-hover:border-white">
                  Conocer al equipo
                </span>
                <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
