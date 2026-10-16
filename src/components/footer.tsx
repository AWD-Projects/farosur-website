import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="on-ink bg-ink px-5 pb-8 pt-16 text-white sm:px-8 lg:px-12 lg:pt-24">
      <div className="mx-auto max-w-site">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <a href="#top" aria-label="FaroSur, volver al inicio">
              <Logo tone="light" className="text-[clamp(3.5rem,9vw,7rem)]" />
            </a>
            <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-white/75">
              Taller de diseño y confección de trajes de baño en la Península de Yucatán, México.
            </p>
          </div>
          <nav aria-label="Pie de página" className="lg:col-span-3">
            <ul className="space-y-3 text-[16px]">
              {NAV.map((n) => (
                <li key={n.id}>
                  <Link href={n.id === "catalogo" ? "/catalogo" : `/#${n.id}`} className="link-u text-white/80 transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 text-[16px] lg:col-span-3">
            <a href={`mailto:${SITE.email}`} className="block break-words text-white/80 transition-colors hover:text-white">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phoneIntl}`} className="block text-white/80 transition-colors hover:text-white">
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <p className="mt-16 flex flex-wrap gap-x-2 border-t border-white/15 pt-6 text-[14px] text-white/70">
          <span>© {new Date().getFullYear()} Faro Sur. Todos los derechos reservados.</span>
          <span aria-hidden="true">·</span>
          <span>
            Desarrollado por{" "}
            <a href="https://amoxtli.tech" target="_blank" rel="noopener noreferrer" className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
              AMOXTLI®
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
