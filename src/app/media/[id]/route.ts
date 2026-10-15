import { NextResponse } from "next/server";
import { readImage } from "@/lib/storage/images";

export const runtime = "nodejs";

/** Sirve una foto del catálogo. El id nunca cambia de contenido, así que se cachea por un año. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const img = await readImage(id);
  if (!img) return new NextResponse(null, { status: 404, headers: { "Cache-Control": "public, max-age=60" } });
  return new NextResponse(new Uint8Array(img.data), {
    headers: {
      "Content-Type": img.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
