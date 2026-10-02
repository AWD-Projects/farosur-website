const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE = {
  name: "Faro Sur",
  title: "Faro Sur | Trajes de baño confeccionados en Yucatán",
  description:
    "Taller yucateco que diseña y confecciona trajes de baño desde 2010. Más de 450 mil prendas para marcas mexicanas. Conoce al equipo y escríbenos.",
  email: "atencionalcliente@grupoeurosol.com",
  phoneDisplay: "+52 999 304 8582",
  phoneIntl: "+529993048582",
  whatsapp: "529993048582",
  hours: "8:00 am a 17:00 horas",
  facebook: "https://www.facebook.com/share/18qw7WHqkS/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/farosuryuc/",
  linkedin: "https://www.linkedin.com/in/ruth-ramirez-2847ba33a",
  videoId: "T2L37nTqqhM",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { id: "origenes", label: "Orígenes" },
  { id: "historias", label: "Historias" },
  { id: "impacto", label: "Impacto social" },
  { id: "clientes", label: "Clientes" },
  { id: "servicios", label: "Servicios" },
] as const;
