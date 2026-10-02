import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-site flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" aria-label="Faro Sur, volver al inicio">
          <Logo className="text-[36px]" />
        </a>
        <p className="text-[14px] text-muted">
          © {new Date().getFullYear()} Faro Sur. Todos los derechos reservados.
          <span className="mx-2" aria-hidden="true">·</span>
          Desarrollado por{" "}
          <a
            href="https://amoxtli.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            AMOXTLI®
          </a>
        </p>
      </div>
    </footer>
  );
}
