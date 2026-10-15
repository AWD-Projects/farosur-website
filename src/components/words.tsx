"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Titulares: cada palabra sube desde una máscara. Párrafos: sube y se aclara. */
  mask?: boolean;
  delay?: number;
  stagger?: number;
};

/**
 * Revelado palabra por palabra al entrar en pantalla. Usa transiciones CSS y un solo
 * IntersectionObserver por bloque (sin un componente de animación por palabra), el
 * contenedor es lo que se observa, y con reduced-motion o sin JavaScript el texto queda
 * visible (ver .w en globals.css y el aviso <noscript> del layout).
 */
export function Words({ children, mask = false, delay = 0, stagger }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const step = stagger ?? (mask ? 0.07 : 0.014);
  const cap = mask ? 0.7 : 0.9;
  let i = 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const word = (w: string, key: string) => {
    const d = delay + Math.min(i++ * step, cap);
    const span = (
      <span className={`reveal w ${mask ? "w-mask" : ""}`} style={{ "--d": `${d.toFixed(3)}s` } as CSSProperties}>
        {w}
      </span>
    );
    return mask ? (
      <span key={key} className="inline-block overflow-clip pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
        {span}
      </span>
    ) : (
      <span key={key} className="inline-block">
        {span}
      </span>
    );
  };

  const walk = (node: ReactNode, path: string): ReactNode =>
    Children.map(node, (child, idx) => {
      const key = `${path}-${idx}`;
      if (typeof child === "string") {
        return child.split(/(\s+)/).map((part, j) => (/^\s+$/.test(part) || part === "" ? part : word(part, `${key}-${j}`)));
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
        return cloneElement(child, undefined, walk(child.props.children, key));
      }
      return child;
    });

  return (
    <span ref={ref} className={inView ? "is-in" : undefined}>
      {walk(children, "w")}
    </span>
  );
}
