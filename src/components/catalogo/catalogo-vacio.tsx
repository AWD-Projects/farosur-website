import { Mail, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

/** Aviso cuando el catálogo no tiene modelos o no se pudo leer. */
export function CatalogoVacio() {
  return (
    <section className="px-5 pb-24 pt-6 sm:px-8 lg:px-12" aria-labelledby="catalogo-vacio">
      <div className="mx-auto max-w-site border-t border-line pt-12 lg:pt-16">
        <h2 id="catalogo-vacio" className="display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight text-ink">
          El catálogo no está disponible por ahora
        </h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
          Estamos actualizando los modelos. Escríbenos y te compartimos el catálogo y los pedidos mínimos.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={whatsappLink("Hola, quisiera conocer el catálogo de trajes de baño.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
          >
            <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
            Pedir el catálogo por WhatsApp
          </a>
          <a href={`mailto:${SITE.email}`} className="btn btn-line">
            <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
