"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { Logo } from "./logo";

const SECTION_IDS = [...NAV.map((n) => n.id), "contacto"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background transition-[box-shadow,border-color] duration-300 ${
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto flex h-[72px] max-w-site items-center justify-between lg:h-[88px]">
        <a href="#top" aria-label="Faro Sur, ir al inicio" className="shrink-0">
          <Logo className="text-[40px] lg:text-[46px]" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`relative py-2 text-[16px] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 ${
                    active === item.id ? "text-foreground after:scale-x-100" : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contacto" className="btn btn-solid hidden !min-h-11 !px-6 lg:inline-flex">
          Contacto
        </a>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>
      </div>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-line bg-background px-5 pb-8 pt-4 sm:px-8 lg:hidden"
      >
        <ul>
          {[...NAV, { id: "contacto", label: "Contacto" }].map((item) => (
            <li key={item.id} className="border-b border-line last:border-0">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-2xl text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
