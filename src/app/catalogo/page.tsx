import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CatalogApp } from "@/components/catalogo/catalog-app";
import { getCatalog } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { products } = await getCatalog();
  const n = products.length;
  return {
  title: "Catálogo de trajes de baño para marcas",
  description: `Explora ${n} modelos de bikinis, trajes enteros, shorts y camisetas UV confeccionados en Yucatán. Elige los tuyos y pide tu cotización.`,
  alternates: { canonical: "/catalogo" },
  openGraph: {
    type: "website",
    url: "/catalogo",
    siteName: "Faro Sur",
    locale: "es_MX",
    title: "Catálogo de trajes de baño para marcas | Faro Sur",
    description: `Explora ${n} modelos de bikinis, trajes enteros, shorts y camisetas UV confeccionados en Yucatán. Elige los tuyos y pide tu cotización.`,
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Faro Sur, trajes de baño confeccionados en Yucatán" }],
  },
  twitter: { card: "summary_large_image", images: ["/twitter-image.jpg"] },
};
}

const NOTICES = [
  { term: "Compra mínima", text: "25 piezas por modelo" },
  { term: "Fabricación", text: "Sobre pedido" },
  { term: "Personalización", text: "Otros colores, telas y estampados" },
];

export default async function CatalogoPage() {
  const { products: PRODUCTS } = await getCatalog();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/catalogo#pagina`,
        url: `${SITE_URL}/catalogo`,
        name: "Catálogo de trajes de baño para marcas",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: PRODUCTS.length,
          itemListElement: PRODUCTS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${p.name} (${p.code})`,
            description: p.description,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE_URL}/catalogo` },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="mt-[72px] lg:mt-[88px]">
        <section className="px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:px-12 lg:pb-14 lg:pt-20">
          <div className="mx-auto grid max-w-site gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="title-hero rise">Catálogo de trajes de baño</h1>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.15} y={14}>
                <p className="max-w-md text-[clamp(1.1rem,1.5vw,1.3rem)] leading-snug text-ink">
                  Agrega los modelos que te interesan y deja tus datos: el equipo de Faro Sur te envía la cotización.
                </p>
              </Reveal>
              <dl className="mt-6 divide-y divide-ink/15 border-y border-ink/15 text-[15px]">
                {NOTICES.map(({ term, text }, i) => (
                  <div key={term} className="rise flex items-baseline justify-between gap-6 py-3" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                    <dt className="text-muted">{term}</dt>
                    <dd className="text-right text-ink">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <CatalogApp products={PRODUCTS} />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
