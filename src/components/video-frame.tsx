"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Video de fondo del hero (autoplay, sin sonido, en loop), a sangre y sin barras.
 * Se monta al terminar de cargar la página para no bloquear el LCP.
 */
export function VideoFrame() {
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => setMount(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(start, 1200);
    return () => window.clearTimeout(t);
  }, []);

  const src = `https://www.youtube-nocookie.com/embed/${SITE.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${SITE.videoId}&modestbranding=1&rel=0&disablekb=1&fs=0&playsinline=1`;

  return (
    <div className="absolute inset-0 z-0 bg-clay" style={{ containerType: "size" }}>
      <div className="beam animate-sweep" aria-hidden="true" />
      {mount && (
        <iframe
          src={src}
          title="Video del taller de Faro Sur"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          onLoad={() => setReady(true)}
          className={`pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: "max(100cqw, calc(100cqh * 16 / 9))",
            height: "max(100cqh, calc(100cqw * 9 / 16))",
          }}
        />
      )}
    </div>
  );
}
