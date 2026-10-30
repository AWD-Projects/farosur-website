import { Body, Button, Column, Container, Font, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Text } from "@react-email/components";
import { render } from "@react-email/render";
import type { Product } from "@/data/products";
import { SITE_URL } from "@/lib/site";

type Lead = { nombre: string; correo: string; telefono: string };

// Paleta del sitio (tokens de globals.css) convertida a hex: los correos no soportan variables CSS.
const c = {
  bg: "#F1EEE9",
  card: "#FFFFFF",
  surface: "#F7F5F2",
  brand: "#4F4749",
  ink: "#2A2520",
  muted: "#6F6A64",
  line: "#E4DFD8",
  clay: "#B5A79A",
};
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const serif = "Georgia, 'Times New Roman', serif";

const absolute = (u: string) => (u.startsWith("http") ? u : `${SITE_URL}${u}`);
const initials = (n: string) =>
  n
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

function QuoteEmail({ lead, items }: { lead: Lead; items: Product[] }) {
  const n = items.length;
  const label = n === 1 ? "1 modelo" : `${n} modelos`;
  const tel = lead.telefono.replace(/[^\d+]/g, "");
  const wa = `https://wa.me/${tel.replace(/^\+/, "").replace(/^(\d{10})$/, "52$1")}?text=${encodeURIComponent(`Hola ${lead.nombre.split(" ")[0]}, te escribimos de Faro Sur sobre tu solicitud de cotización.`)}`;
  const mail = `mailto:${lead.correo}?subject=${encodeURIComponent("Tu cotización con Faro Sur")}`;

  return (
    <Html lang="es-MX">
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
        <Font fontFamily="Montserrat" fallbackFontFamily="Arial" webFont={{ url: "https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2", format: "woff2" }} fontWeight={400} fontStyle="normal" />
      </Head>
      <Preview>{`${lead.nombre} pidió cotización de ${label} · ${lead.telefono}`}</Preview>
      <Body style={{ margin: 0, padding: "32px 12px", backgroundColor: c.bg, fontFamily: sans }}>
        <Container style={{ maxWidth: 600, width: "100%" }}>
          {/* Marca */}
          <Section style={{ padding: "0 4px 18px" }}>
            <Text style={{ margin: 0, fontFamily: "Montserrat, Arial, sans-serif", fontSize: 20, letterSpacing: "-0.5px", color: c.brand }}>
              <strong style={{ fontWeight: 700 }}>FARO</strong>
              <span style={{ fontWeight: 300 }}>SUR</span>
            </Text>
          </Section>

          <Section style={{ backgroundColor: c.card, borderRadius: 4, border: `1px solid ${c.line}` }}>
            {/* Encabezado */}
            <Section style={{ padding: "40px 40px 8px" }}>
              <Text style={{ margin: 0, fontSize: 12, letterSpacing: "1.6px", textTransform: "uppercase", color: c.muted }}>Nueva solicitud de cotización</Text>
              <Heading as="h1" style={{ margin: "14px 0 0", fontFamily: serif, fontWeight: 400, fontSize: 32, lineHeight: "38px", color: c.ink }}>
                {lead.nombre} pidió cotización de {label}
              </Heading>
              <Text style={{ margin: "14px 0 0", fontSize: 15, lineHeight: "24px", color: c.muted }}>
                Llegó desde el catálogo del sitio. Responda directo a este correo o use los botones: el contacto ya está listo.
              </Text>
            </Section>

            {/* Contacto */}
            <Section style={{ padding: "24px 40px 0" }}>
              <Section style={{ backgroundColor: c.surface, borderRadius: 4, padding: "20px 22px" }}>
                <Row>
                  <Column style={{ width: 60, paddingRight: 14, verticalAlign: "top" }} width={60}>
                    <div style={{ width: 44, height: 44, lineHeight: "44px", borderRadius: 22, backgroundColor: c.brand, color: "#FFFFFF", textAlign: "center", fontFamily: sans, fontSize: 15, fontWeight: 600 }}>{initials(lead.nombre)}</div>
                  </Column>
                  <Column style={{ verticalAlign: "top" }}>
                    <Text style={{ margin: 0, fontSize: 17, fontWeight: 600, color: c.ink }}>{lead.nombre}</Text>
                    <Text style={{ margin: "6px 0 0", fontSize: 14, lineHeight: "22px", color: c.muted }}>
                      <Link href={mail} style={{ color: c.brand, textDecoration: "underline" }}>{lead.correo}</Link>
                      <br />
                      <Link href={`tel:${tel}`} style={{ color: c.brand, textDecoration: "underline" }}>{lead.telefono}</Link>
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* Modelos */}
            <Section style={{ padding: "32px 40px 0" }}>
              <Row>
                <Column>
                  <Text style={{ margin: 0, fontFamily: serif, fontSize: 22, color: c.ink }}>Modelos de interés</Text>
                </Column>
                <Column style={{ textAlign: "right" }}>
                  <Text style={{ margin: 0, fontSize: 13, color: c.muted }}>{label}</Text>
                </Column>
              </Row>
              <Hr style={{ border: "none", borderTop: `1px solid ${c.ink}`, margin: "12px 0 0" }} />
              {items.map((p) => {
                const photo = p.photos?.[0];
                return (
                  <Section key={p.code} style={{ borderBottom: `1px solid ${c.line}` }}>
                    <Row>
                      <Column style={{ width: 84, padding: "16px 16px 16px 0", verticalAlign: "top" }}>
                        {photo ? (
                          <Img src={absolute(photo)} alt={`${p.name}, ${p.code}`} width={68} height={85} style={{ display: "block", width: 68, height: 85, objectFit: "cover", borderRadius: 2, backgroundColor: c.surface }} />
                        ) : (
                          <div style={{ width: 68, height: 85, backgroundColor: c.surface, borderRadius: 2 }} />
                        )}
                      </Column>
                      <Column style={{ padding: "16px 0", verticalAlign: "top" }}>
                        <Text style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: c.clay }}>{p.code}</Text>
                        <Text style={{ margin: "4px 0 0", fontFamily: serif, fontSize: 20, lineHeight: "24px", color: c.ink }}>{p.name}</Text>
                        <Text style={{ margin: "6px 0 0", fontSize: 13, lineHeight: "20px", color: c.muted }}>
                          {[p.tipo, p.genero].filter(Boolean).join(" · ")}
                          {p.categoria?.length ? ` · ${p.categoria.join(", ")}` : ""}
                        </Text>
                        {p.tallas?.length ? <Text style={{ margin: "2px 0 0", fontSize: 13, lineHeight: "20px", color: c.muted }}>Tallas: {p.tallas.join(", ")}</Text> : null}
                      </Column>
                    </Row>
                  </Section>
                );
              })}
              <Text style={{ margin: "16px 0 0", fontSize: 13, lineHeight: "20px", color: c.muted }}>Sin cantidades: la compra mínima es de 25 piezas por modelo.</Text>
            </Section>

            {/* Acciones */}
            <Section style={{ padding: "28px 40px 44px" }}>
              <Row>
                <Column style={{ paddingRight: 10, whiteSpace: "nowrap" }} width={200}>
                  <Button href={mail} style={{ backgroundColor: c.brand, color: "#FFFFFF", fontSize: 15, fontWeight: 600, borderRadius: 2, padding: "14px 22px", textDecoration: "none", display: "inline-block", whiteSpace: "nowrap" }}>Responder por correo</Button>
                </Column>
                <Column style={{ paddingRight: 10, whiteSpace: "nowrap" }} width={120}>
                  <Button href={wa} style={{ border: `1px solid ${c.brand}`, color: c.brand, fontSize: 15, fontWeight: 600, borderRadius: 2, padding: "13px 20px", textDecoration: "none", display: "inline-block" }}>WhatsApp</Button>
                </Column>
                <Column>
                  <Button href={`tel:${tel}`} style={{ border: `1px solid ${c.line}`, color: c.muted, fontSize: 15, fontWeight: 600, borderRadius: 2, padding: "13px 20px", textDecoration: "none", display: "inline-block" }}>Llamar</Button>
                </Column>
              </Row>
            </Section>
          </Section>

          <Section style={{ padding: "22px 8px 0" }}>
            <Text style={{ margin: 0, fontSize: 12, lineHeight: "18px", color: c.muted, textAlign: "center" }}>
              Enviado desde el <Link href={`${SITE_URL}/catalogo`} style={{ color: c.muted, textDecoration: "underline" }}>catálogo de Faro Sur</Link>.
              <br />
              Desarrollado por AMOXTLI®
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export async function buildQuoteEmail(lead: Lead, items: Product[]) {
  const n = items.length;
  const subject = `Solicitud de cotización: ${n} ${n === 1 ? "modelo" : "modelos"} (${lead.nombre})`;
  const el = <QuoteEmail lead={lead} items={items} />;
  const html = await render(el);
  const text = [
    "Nueva solicitud de cotización desde el catálogo de Faro Sur",
    "",
    `Nombre: ${lead.nombre}`,
    `Correo: ${lead.correo}`,
    `Teléfono: ${lead.telefono}`,
    "",
    `Modelos de interés (${n}):`,
    ...items.map((p) => `- ${p.code} ${p.name} (${[p.tipo, p.genero].filter(Boolean).join(", ")}${p.tallas?.length ? `; tallas ${p.tallas.join(", ")}` : ""})`),
    "",
    "Sin cantidades: la compra mínima es de 25 piezas por modelo.",
  ].join("\n");
  return { subject, html, text };
}
