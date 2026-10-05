import type { Metadata } from "next";
import { Layers, Palette, Scissors } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CatalogApp } from "@/components/catalogo/catalog-app";
import { PRODUCTS } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catálogo de trajes de baño para marcas",
  description: `Explora ${PRODUCTS.length} modelos de bikinis, trajes enteros, shorts y camisetas UV confeccionados en Yucatán. Elige los tuyos y pide tu cotización.`,
  alternates: { canonical: "/catalogo" },
  openGraph: {
    type: "website",
    url: "/catalogo",
    siteName: "Faro Sur",
    locale: "es_MX",
    title: "Catálogo de trajes de baño para marcas | Faro Sur",
    description: `Explora ${PRODUCTS.length} modelos de bikinis, trajes enteros, shorts y camisetas UV confeccionados en Yucatán. Elige los tuyos y pide tu cotización.`,
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Faro Sur, trajes de baño confeccionados en Yucatán" }],
  },
  twitter: { card: "summary_large_image", images: ["/twitter-image.jpg"] },
};

const NOTICES = [
  { icon: Layers, text: "Compra mínima de 25 piezas" },
  { icon: Scissors, text: "Fabricación sobre pedido" },
  { icon: Palette, text: "Otros colores, telas y estampados" },
];

export default function CatalogoPage() {
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
        <section className="border-b border-line bg-clay/25 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="mx-auto max-w-site">
            <h1 className="section-title">Catálogo de trajes de baño</h1>
            <p className="mt-5 max-w-xl text-[clamp(1.1rem,1.5vw,1.3rem)] leading-snug text-foreground">
              Agrega los modelos que te interesan y deja tus datos: el equipo de Faro Sur te envía la cotización.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {NOTICES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-[15px] text-foreground">
                  <Icon size={20} strokeWidth={1.5} className="text-muted" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <CatalogApp />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
