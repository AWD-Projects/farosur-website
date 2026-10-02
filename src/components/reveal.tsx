"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Revelado al entrar en pantalla. Con reduced-motion llega al estado final sin animar. */
export function Reveal({ children, className = "", delay = 0, y = 24 }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Revelado por máscara, para fotografías. El contenedor es el que se observa. */
export function MaskReveal({ children, className = "", delay = 0 }: Omit<Props, "y">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
