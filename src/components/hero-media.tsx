"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { VideoFrame } from "./video-frame";

/** Video del taller en marco vertical. Al bajar, el video se desplaza menos que la página. */
export function HeroMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.16]);

  return (
    <div ref={ref} className="frame-in relative aspect-[4/5] w-full overflow-clip rounded-frame bg-clay">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <VideoFrame />
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
    </div>
  );
}
