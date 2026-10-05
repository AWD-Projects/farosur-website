import type { Product } from "@/data/products";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

type Lead = { nombre: string; correo: string; telefono: string };

export function buildQuoteEmail(lead: Lead, items: Product[]) {
  const n = items.length;
  const subject = `Solicitud de cotización: ${n} ${n === 1 ? "modelo" : "modelos"} (${lead.nombre})`;
  const tel = lead.telefono.replace(/[^\d+]/g, "");

  const rows = items
    .map(
      (p) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #E6E1D9;font:600 14px Arial,Helvetica,sans-serif;color:#7A7165;width:84px;">${esc(p.code)}</td>
        <td style="padding:12px 0;border-bottom:1px solid #E6E1D9;font:16px Georgia,'Times New Roman',serif;color:#4D4439;">${esc(p.name)}</td>
        <td style="padding:12px 0;border-bottom:1px solid #E6E1D9;font:14px Arial,Helvetica,sans-serif;color:#6B645B;text-align:right;">${esc(p.tipo)} · ${esc(p.genero)}</td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#F8F7F5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F7F5;padding:24px 12px;">
 <tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFFFFF;border-radius:12px;overflow:hidden;">
   <tr><td style="background:#4D4439;padding:24px 32px;font:700 26px Arial,Helvetica,sans-serif;letter-spacing:1px;color:#FFFFFF;">Faro Sur</td></tr>
   <tr><td style="padding:32px 32px 8px;">
     <p style="margin:0 0 6px;font:14px Arial,Helvetica,sans-serif;color:#6B645B;">Nueva solicitud desde el catálogo</p>
     <h1 style="margin:0;font:400 28px/1.2 Georgia,'Times New Roman',serif;color:#4D4439;">${esc(lead.nombre)} pidió cotización de ${n} ${n === 1 ? "modelo" : "modelos"}</h1>
   </td></tr>
   <tr><td style="padding:16px 32px 0;">
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F7F5;border-radius:8px;">
      <tr><td style="padding:16px 20px;font:15px/1.7 Arial,Helvetica,sans-serif;color:#4D4439;">
        <strong>Nombre:</strong> ${esc(lead.nombre)}<br>
        <strong>Correo:</strong> <a href="mailto:${esc(lead.correo)}" style="color:#4D4439;">${esc(lead.correo)}</a><br>
        <strong>Teléfono:</strong> <a href="tel:${esc(tel)}" style="color:#4D4439;">${esc(lead.telefono)}</a>
      </td></tr>
     </table>
   </td></tr>
   <tr><td style="padding:24px 32px 0;">
     <p style="margin:0 0 4px;font:600 16px Arial,Helvetica,sans-serif;color:#4D4439;">Modelos de interés</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
     <p style="margin:12px 0 0;font:13px/1.5 Arial,Helvetica,sans-serif;color:#6B645B;">Sin cantidades: la compra mínima es de 25 piezas por modelo.</p>
   </td></tr>
   <tr><td style="padding:28px 32px 36px;">
     <table role="presentation" cellpadding="0" cellspacing="0"><tr>
       <td style="background:#4D4439;border-radius:999px;"><a href="mailto:${esc(lead.correo)}?subject=${encodeURIComponent("Tu cotización con Faro Sur")}" style="display:inline-block;padding:14px 26px;font:600 15px Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;">Responder por correo</a></td>
       <td style="width:12px;"></td>
       <td style="border:1px solid #4D4439;border-radius:999px;"><a href="tel:${esc(tel)}" style="display:inline-block;padding:13px 26px;font:600 15px Arial,Helvetica,sans-serif;color:#4D4439;text-decoration:none;">Llamar</a></td>
     </tr></table>
   </td></tr>
   <tr><td style="background:#F8F7F5;padding:18px 32px;font:12px Arial,Helvetica,sans-serif;color:#7A7165;">Enviado desde el catálogo de Faro Sur. Desarrollado por AMOXTLI®</td></tr>
  </table>
 </td></tr>
</table>
</body></html>`;

  const text = [
    `Nueva solicitud de cotización desde el catálogo de Faro Sur`,
    ``,
    `Nombre: ${lead.nombre}`,
    `Correo: ${lead.correo}`,
    `Teléfono: ${lead.telefono}`,
    ``,
    `Modelos de interés (${n}):`,
    ...items.map((p) => `- ${p.code} ${p.name} (${p.tipo}, ${p.genero})`),
    ``,
    `Sin cantidades: la compra mínima es de 25 piezas por modelo.`,
  ].join("\n");

  return { subject, html, text };
}
