import { NextResponse } from "next/server";
import { readImage } from "@/lib/storage/images";

export const runtime = "nodejs";

/** Sirve una foto del catálogo. El id nunca cambia de contenido, así que se cachea por un año. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const img = await readImage(id);
  if (!img) return new NextResponse(null, { status: 404, headers: { "Cache-Control": "public, max-age=60" } });
  // ?w=180 devuelve una miniatura JPEG: los correos la necesitan porque Outlook y otros clientes no abren WebP.
  const w = Number(new URL(req.url).searchParams.get("w"));
  if (Number.isFinite(w) && w >= 40 && w <= 800) {
    try {
      const { default: sharp } = await import("sharp");
      const thumb = await sharp(img.data).rotate().resize({ width: Math.round(w), withoutEnlargement: true }).flatten({ background: "#F7F5F2" }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      return new NextResponse(new Uint8Array(thumb), {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
          "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
          "X-Content-Type-Options": "nosniff",
        },
      });
    } catch {
      /* si no hay sharp, se sirve la foto original */
    }
  }
  return new NextResponse(new Uint8Array(img.data), {
    headers: {
      "Content-Type": img.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
