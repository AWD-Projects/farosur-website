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

  // El reproductor de YouTube toma el foco al cargar y eso mueve el scroll de la página.
  // Si la persona no ha movido la página, se conserva la posición en la que estaba.
  useEffect(() => {
    if (!mount) return;
    const y0 = window.scrollY;
    let userMoved = false;
    const mark = () => {
      userMoved = true;
    };
    const inputs = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    inputs.forEach((e) => window.addEventListener(e, mark, { passive: true, once: true }));
    const onScroll = () => {
      if (userMoved || Math.abs(window.scrollY - y0) < 2) return;
      window.__lenis?.scrollTo(y0, { immediate: true });
      window.scrollTo({ top: y0, behavior: "instant" });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const stop = window.setTimeout(() => window.removeEventListener("scroll", onScroll), 8000);
    return () => {
      window.clearTimeout(stop);
      window.removeEventListener("scroll", onScroll);
      inputs.forEach((e) => window.removeEventListener(e, mark));
    };
  }, [mount]);

  const src = `https://www.youtube.com/embed/${SITE.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${SITE.videoId}&modestbranding=1&rel=0&disablekb=1&fs=0`;

  return (
    <div className="absolute inset-0 z-0 overflow-clip bg-clay" style={{ containerType: "size" }}>
      <div className="beam animate-sweep" aria-hidden="true" />
      {mount && (
        <iframe
          src={src}
          title="Video del taller de Faro Sur"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
          inert
          aria-hidden="true"
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
