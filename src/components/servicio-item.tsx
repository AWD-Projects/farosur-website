"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SITE, whatsappLink } from "@/lib/site";
import type { Service } from "@/lib/content";
import { Reveal } from "./reveal";

const PENDING = "La descripción detallada de este servicio estará disponible pronto. Mientras tanto, escríbenos y te contamos qué incluye.";

/** Fila de servicio: al abrirla muestra la descripción y un botón para pedirlo por WhatsApp. */
export function ServicioItem({ service: s, index }: { service: Service; index: number }) {
  const href = whatsappLink(`Hola, me interesa el servicio de ${s.title.toLowerCase()}.`);
  return (
    <li className="border-t border-line last:border-b">
      <Reveal delay={index * 0.06} y={16}>
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative flex w-full items-center justify-between gap-6 overflow-hidden py-7 text-left sm:py-9"
            >
              <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <h3 className="display text-[clamp(2rem,4.6vw,3.75rem)] leading-none transition-transform duration-500 ease-out group-hover:translate-x-3">
                {s.title}
              </h3>
              <ArrowUpRight
                size={34}
                strokeWidth={1.2}
                aria-hidden="true"
                className="shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
              />
              <span className="sr-only">: ver detalle del servicio</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl overflow-y-auto" closeLabel="Cerrar detalle del servicio">
            <div className="p-6 sm:px-10 sm:py-8 lg:px-14">
              <DialogTitle className="display pr-10 text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">{s.title}</DialogTitle>
              <DialogDescription asChild>
                <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-ink sm:text-[17px]">
                  {s.paragraphs?.map((t) => <p key={t}>{t}</p>)}
                  {s.points && (
                    <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
                      {s.points.map((pt) => (
                        <li key={pt.title} className="border-l border-ink/30 pl-4">
                          <strong className="font-semibold">{pt.title}:</strong> {pt.text}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.closing && <p>{s.closing}</p>}
                  {!s.paragraphs && <p>{PENDING}</p>}
                  <p className="text-[15px] text-muted">Escríbenos por WhatsApp al {SITE.cdmxPhoneDisplay} y recibe más información sobre nuestros servicios.</p>
                </div>
              </DialogDescription>
              <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-6 w-full sm:w-auto">
                <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
                Solicitar por WhatsApp
              </a>
            </div>
          </DialogContent>
        </Dialog>
      </Reveal>
    </li>
  );
}
