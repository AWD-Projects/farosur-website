import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";
import { buildQuoteEmail } from "@/lib/quote-email";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Solicitud no válida.");
  }

  // Trampa para bots: el campo existe pero una persona nunca lo llena.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return bad("Demasiados intentos. Espera unos minutos.", 429);

  const nombre = String(body.nombre ?? "").trim().slice(0, 120);
  const correo = String(body.correo ?? "").trim().slice(0, 160);
  const telefono = String(body.telefono ?? "").trim().slice(0, 40);
  const codes = Array.isArray(body.modelos) ? body.modelos.map(String).slice(0, 80) : [];

  if (nombre.length < 2 || !EMAIL_RE.test(correo) || telefono.replace(/\D/g, "").length < 10) {
    return bad("Revisa tu nombre, correo y teléfono.");
  }
  const items = [...new Set(codes)].map((c) => getProduct(c)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (items.length === 0) return bad("Agrega al menos un modelo.");

  const { subject, html, text } = buildQuoteEmail({ nombre, correo, telefono }, items);

  if (process.env.QUOTE_DRY_RUN === "1") {
    console.info("[cotizacion] simulada:", subject);
    return NextResponse.json({ ok: true, simulated: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[cotizacion] faltan RESEND_API_KEY, QUOTE_TO_EMAIL o QUOTE_FROM_EMAIL");
    return bad("El envío aún no está disponible. Escríbenos por WhatsApp.", 503);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Catálogo Faro Sur <${from}>`,
      to: to.split(",").map((s) => s.trim()),
      reply_to: correo,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[cotizacion] Resend respondió", res.status, await res.text().catch(() => ""));
    return bad("No pudimos enviar tu solicitud. Intenta de nuevo.", 502);
  }
  return NextResponse.json({ ok: true });
}
