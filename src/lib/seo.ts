import { SITE, SITE_URL } from "./site";
import { SERVICES } from "./content";

/** Un solo @graph con ids estables. Solo datos confirmados en el sitio. */
export function buildJsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.name,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        image: `${SITE_URL}/opengraph-image.jpg`,
        description: SITE.description,
        foundingDate: "2010",
        email: SITE.email,
        telephone: SITE.phoneIntl,
        areaServed: { "@type": "Country", name: "México" },
        address: {
          "@type": "PostalAddress",
          addressRegion: "Yucatán",
          addressCountry: "MX",
        },
        knowsAbout: [
          "Confección de trajes de baño",
          "Diseño de trajes de baño",
          "Moldería",
          "Desarrollo de producto",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "atención al cliente",
          telephone: SITE.phoneIntl,
          email: SITE.email,
          availableLanguage: "es",
        },
        sameAs: [SITE.facebook, SITE.instagram],
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        inLanguage: "es-MX",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE.title,
        description: SITE.description,
        inLanguage: "es-MX",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": orgId },
      },
    ],
  };
}
