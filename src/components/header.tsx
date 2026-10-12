"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV, whatsappLink } from "@/lib/site";
import { QUOTE_OPEN_EVENT, useQuoteCount } from "@/lib/use-quote-count";
import { Logo } from "./logo";

const SECTION_IDS = [...NAV.map((n) => n.id), "contacto"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  const count = useQuoteCount();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const isHome = pathname === "/";
  const base = isHome ? "" : "/";
  const onCatalog = pathname.startsWith("/catalogo");
  const current = isHome ? active : onCatalog ? "catalogo" : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const quoteLabel = count > 0 ? `Mi cotización, ${count} ${count === 1 ? "modelo" : "modelos"}` : "Cotizar modelos";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background transition-[border-color] duration-300 ${
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid h-[72px] max-w-site grid-cols-[auto_1fr_auto] items-center gap-6 lg:h-[84px]">
          <a href={isHome ? "#top" : "/"} aria-label="FaroSur, ir al inicio" className="shrink-0">
            <Logo className="text-[38px] lg:text-[44px]" />
          </a>

          <nav aria-label="Principal" className="hidden justify-self-center lg:block">
            <ul className="flex items-center gap-7 xl:gap-10">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.id === "catalogo" && !isHome ? "/catalogo" : `${base}#${item.id}`}
                    aria-current={current === item.id ? "true" : undefined}
                    className={`relative py-2 text-[15px] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-500 after:ease-out hover:text-ink hover:after:scale-x-100 ${
                      current === item.id ? "text-ink after:scale-x-100" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end gap-3">
            <a href={`${base}#contacto`} className="hidden px-2 py-2 text-[15px] text-muted transition-colors hover:text-ink xl:inline">
              Contacto
            </a>
            <Link
              href="/catalogo"
              aria-label={quoteLabel}
              onClick={(e) => {
                if (onCatalog && count > 0) {
                  e.preventDefault();
                  window.dispatchEvent(new Event(QUOTE_OPEN_EVENT));
                }
              }}
              className="btn btn-solid hidden !min-h-11 !px-5 lg:inline-flex"
            >
              Cotizar
              {count > 0 && (
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-[13px] font-semibold tabular-nums text-ink">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={26} strokeWidth={1.4} /> : <Menu size={26} strokeWidth={1.4} />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left bg-clay motion-reduce:hidden"
      />

      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] flex flex-col [&[hidden]]:hidden overflow-y-auto bg-background px-5 pb-8 pt-4 sm:px-8 lg:hidden"
      >
        <ul className="flex-1">
          {[...NAV, { id: "contacto", label: "Contacto" }].map((item) => (
            <li key={item.id} className="border-b border-line">
              <a
                href={item.id === "catalogo" && !isHome ? "/catalogo" : `${base}#${item.id}`}
                onClick={() => setOpen(false)}
                className="display block py-4 text-[2rem] leading-none"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3">
          <Link href="/catalogo" onClick={() => setOpen(false)} className="btn btn-solid">
            {quoteLabel}
          </Link>
          <a href={whatsappLink("Hola, vi su sitio y me gustaría platicar sobre la confección de trajes de baño.")} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
