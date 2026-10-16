"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    // Scroll suave solo con ratón y sin reduced-motion; en táctil el scroll nativo es mejor y más ligero.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let lenis: Lenis | undefined;
    const start = () => {
      lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -88 } });
      window.__lenis = lenis;
    };
    const idle = "requestIdleCallback" in window;
    const id = idle ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 400);
    return () => {
      if (idle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
      lenis?.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}
