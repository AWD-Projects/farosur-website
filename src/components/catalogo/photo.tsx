"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Foto con marcador de carga: muestra un destello suave hasta que la imagen termina de bajar. */
export function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Una imagen en caché puede estar lista antes de que React enganche onLoad.
  useEffect(() => {
    setLoaded(Boolean(ref.current?.complete && ref.current.naturalWidth > 0));
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      className={cn("object-cover transition-opacity duration-500", loaded ? "opacity-100" : "skeleton opacity-100", className)}
    />
  );
}
