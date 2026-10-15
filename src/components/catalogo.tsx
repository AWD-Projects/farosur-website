import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildFilterGroups } from "@/data/products";
import { getCatalog } from "@/lib/catalog";
import { Reveal } from "./reveal";
import { Words } from "./words";
import { ProductMedia, cardViews } from "./catalogo/media";

/** Vista previa del catálogo en el inicio: toma los primeros modelos del catálogo real (o de muestra mientras no se carguen). */
export async function Catalogo() {
  const { products } = await getCatalog();
  const preview = products.slice(0, 10);
  const tipos = buildFilterGroups(products).find((g) => g.key === "tipo")?.options ?? [];

  return (
    <section id="catalogo" className="on-ink grain overflow-clip bg-ink py-20 text-white sm:py-28 lg:py-36">
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-site items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="section-title !text-white">
              <Words mask>Catálogo</Words>
            </h2>
            <p className="mt-6 max-w-md text-[clamp(1.1rem,1.5vw,1.35rem)] leading-snug text-white/85">
              <Words delay={0.3}>{`${products.length} modelos para explorar y cotizar en minutos.`}</Words>
            </p>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.15} y={14}>
              <ul className="flex flex-wrap gap-2">
                {tipos.map((t) => (
                  <li key={t}>
                    <Link
                      href={`/catalogo?tipo=${encodeURIComponent(t)}`}
                      className="inline-flex min-h-10 items-center border border-white/30 px-4 text-[14px] text-white/90 transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
                    >
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/catalogo" className="btn btn-light group mt-7">
                Explorar el catálogo
                <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="drift-wrap mt-14 overflow-x-clip lg:mt-20" aria-label="Modelos del catálogo">
        <ul className="drift flex gap-4 px-5 sm:gap-6 sm:px-8 lg:px-12">
          {[...preview, ...preview].map((p, i) => {
            const dup = i >= preview.length;
            return (
              <li key={`${p.code}-${i}`} className="w-48 shrink-0 sm:w-60 lg:w-64" aria-hidden={dup || undefined}>
                <Link
                  href={`/catalogo?modelo=${encodeURIComponent(p.code)}`}
                  tabIndex={dup ? -1 : undefined}
                  className="group block"
                  aria-label={dup ? undefined : `Ver modelo ${p.name}, código ${p.code}`}
                >
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-frame bg-surface">
                    <ProductMedia
                      product={p}
                      view={cardViews(p)[0]}
                      sample="p-6"
                      className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-3 text-[15px]">
                    <span className="display !text-white text-[1.35rem] leading-none">{p.name}</span>
                    <span className="shrink-0 text-white/70">{p.code}</span>
                  </span>
                  <span className="mt-1 block text-[14px] text-white/70">
                    {p.tipo} · {p.genero}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
