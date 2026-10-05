"use client";

import { Children, cloneElement, isValidElement, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  /** Titulares: cada palabra sube desde una máscara. Párrafos: sube y se aclara. */
  mask?: boolean;
  delay?: number;
  stagger?: number;
};

/**
 * Revelado palabra por palabra al entrar en pantalla. El contenedor es el que se observa;
 * con reduced-motion cada palabra llega al estado final sin animar. Las palabras llevan
 * la clase `reveal` para que el aviso <noscript> las deje visibles sin JavaScript.
 */
export function Words({ children, mask = false, delay = 0, stagger }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const step = stagger ?? (mask ? 0.07 : 0.014);
  let i = 0;

  const word = (w: string, key: string) => {
    const d = reduce ? 0 : delay + Math.min(i++ * step, mask ? 0.7 : 0.9);
    const motionWord = (
      <motion.span
        className="reveal inline-block will-change-transform"
        initial={mask ? { y: "110%" } : { opacity: 0, y: 14 }}
        animate={inView ? (mask ? { y: "0%" } : { opacity: 1, y: 0 }) : undefined}
        transition={{ duration: reduce ? 0 : mask ? 0.85 : 0.6, delay: d, ease: [0.22, 1, 0.36, 1] }}
      >
        {w}
      </motion.span>
    );
    return mask ? (
      <span key={key} className="inline-block overflow-clip pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
        {motionWord}
      </span>
    ) : (
      <span key={key} className="inline-block">
        {motionWord}
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

  return <span ref={ref}>{walk(children, "w")}</span>;
}
