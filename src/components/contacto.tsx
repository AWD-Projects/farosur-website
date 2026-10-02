import { Clock, Mail, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { Reveal } from "./reveal";

function Facebook() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.300 0-3.800 1.400-3.800 3.900v2.300H7.900v3h2.600V21h3Z" />
    </svg>
  );
}
function Instagram() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M5.2 9.2h3v9.6h-3V9.200ZM6.700 4.500a1.700 1.700 0 1 1 0 3.400 1.700 1.700 0 0 1 0-3.400ZM10.300 9.200h2.900v1.300c.4-.8 1.400-1.600 2.900-1.600 3 0 3.600 2 3.600 4.600v5.300h-3v-4.700c0-1.100 0-2.600-1.600-2.600s-1.800 1.200-1.800 2.500v4.800h-3V9.200Z" />
    </svg>
  );
}

const SOCIAL = [
  { label: "Faro Sur en Facebook", href: SITE.facebook, Icon: Facebook },
  { label: "Faro Sur en Instagram", href: SITE.instagram, Icon: Instagram },
  { label: "Perfil de LinkedIn de Ruth Ramírez", href: SITE.linkedin, Icon: LinkedIn },
];

export function Contacto() {
  return (
    <section id="contacto" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="section-title">Contacto</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-[clamp(1.05rem,1.3vw,1.2rem)] leading-relaxed text-muted">
                Cuéntanos qué quieres desarrollar y conversamos.
              </p>
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ul className="border-t border-line">
              <li className="border-b border-line">
                <a
                  href={whatsappLink("Hola, vi su sitio y me gustaría platicar sobre la confección de trajes de baño.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 py-6 sm:py-7"
                >
                  <MessageCircle size={26} strokeWidth={1.4} className="shrink-0 text-muted" aria-hidden="true" />
                  <span className="flex-1">
                    <span className="block text-[14px] text-muted">WhatsApp</span>
                    <span className="block font-display text-[clamp(1.35rem,2.6vw,2rem)] text-foreground underline decoration-transparent underline-offset-8 transition-colors group-hover:decoration-foreground/40">
                      {SITE.phoneDisplay}
                    </span>
                  </span>
                </a>
              </li>
              <li className="border-b border-line">
                <a href={`mailto:${SITE.email}`} className="group flex items-center gap-5 py-6 sm:py-7">
                  <Mail size={26} strokeWidth={1.4} className="shrink-0 text-muted" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] text-muted">Correo</span>
                    <span className="block font-display text-[clamp(0.95rem,4.1vw,1.65rem)] [overflow-wrap:anywhere] text-foreground underline decoration-transparent underline-offset-8 transition-colors group-hover:decoration-foreground/40">
                      {SITE.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="border-b border-line">
                <div className="flex items-center gap-5 py-6 sm:py-7">
                  <Clock size={26} strokeWidth={1.4} className="shrink-0 text-muted" aria-hidden="true" />
                  <span className="flex-1">
                    <span className="block text-[14px] text-muted">Horario</span>
                    <span className="block font-display text-[clamp(1.1rem,2.2vw,1.65rem)] text-foreground">
                      {SITE.hours}
                    </span>
                  </span>
                </div>
              </li>
            </ul>

            <ul className="mt-8 flex gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-foreground hover:bg-foreground hover:text-white"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
