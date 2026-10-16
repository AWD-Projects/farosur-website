"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Cifra que sube hasta su valor al entrar en pantalla. El servidor y quien no ejecuta JavaScript
 * ven el valor final; con reduced-motion no se anima.
 */
export function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [n, setN] = useState(to);
  const armed = useRef(false);

  useLayoutEffect(() => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    // Solo se parte de cero si la cifra aún no está a la vista; si ya se ve, se deja el valor final.
    if (r && r.top > window.innerHeight * 0.85) {
      armed.current = true;
      setN(0);
    }
  }, [reduce]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    const controls = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
