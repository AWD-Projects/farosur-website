import type { Tipo, Vista } from "@/data/products";

/**
 * Ilustración de muestra de cada prenda en azul rey liso (como el muestrario real,
 * RN03 del PRD). Se reemplaza por las fotografías de Faro Sur al cargar los modelos.
 */
const FILL = "#2A4DB0";
const SEAM = "#1B3585";
const LIGHT = "#5B7AD6";

function Shape({ tipo, vista }: { tipo: Tipo; vista: Vista }) {
  const back = vista === "espalda";
  const stroke = { stroke: SEAM, strokeWidth: 1.6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const line = { ...stroke, fill: "none" };

  switch (tipo) {
    case "Bikini":
      return (
        <g>
          <path d="M80 120 L112 52 M160 120 L128 52" {...line} stroke={FILL} strokeWidth={3} />
          <path d="M74 118 L40 132 M166 118 L200 132" {...line} stroke={FILL} strokeWidth={3} />
          <path d="M74 118 L116 110 Q112 142 96 152 Q80 146 74 118Z" fill={FILL} {...stroke} />
          <path d="M166 118 L124 110 Q128 142 144 152 Q160 146 166 118Z" fill={FILL} {...stroke} />
          {back && <path d="M112 52 Q120 62 128 52" {...line} stroke={LIGHT} />}
          <path d="M70 190 L38 184 M170 190 L202 184" {...line} stroke={FILL} strokeWidth={3} />
          <path d="M70 190 L170 190 Q150 202 128 250 Q120 260 112 250 Q90 202 70 190Z" fill={FILL} {...stroke} />
          {back && <path d="M120 192 V232" {...line} stroke={LIGHT} />}
        </g>
      );
    case "Traje entero":
      return (
        <g>
          <path
            d="M88 44 L104 44 Q108 84 120 88 Q132 84 136 44 L152 44 Q160 100 150 132 Q142 156 152 184 Q168 214 148 250 Q134 262 120 252 Q106 262 92 250 Q72 214 88 184 Q98 156 90 132 Q80 100 88 44Z"
            fill={FILL}
            {...stroke}
          />
          <path d={back ? "M104 44 Q120 118 136 44" : "M96 132 Q120 146 144 132"} {...line} stroke={back ? SEAM : LIGHT} />
          <path d="M120 88 V150" {...line} stroke={LIGHT} opacity={back ? 0 : 0.7} />
        </g>
      );
    case "Short de baño":
      return (
        <g>
          <path d="M64 92 H176 L192 218 H128 L120 164 L112 218 H48 Z" fill={FILL} {...stroke} />
          <path d="M64 70 H176 V94 H64Z" fill={FILL} {...stroke} />
          {!back ? (
            <path d="M114 94 L108 126 M126 94 L132 126" {...line} stroke={LIGHT} strokeWidth={2.4} />
          ) : (
            <path d="M84 126 H108" {...line} stroke={LIGHT} />
          )}
          <path d="M120 164 V94" {...line} stroke={SEAM} opacity={0.5} />
        </g>
      );
    case "Camiseta UV":
      return (
        <g>
          <path
            d="M88 54 Q104 70 120 70 Q136 70 152 54 L196 80 L182 196 L156 184 L156 252 H84 V184 L58 196 L44 80 Z"
            fill={FILL}
            {...stroke}
          />
          <path d={back ? "M92 56 Q120 64 148 56" : "M92 56 Q120 90 148 56"} {...line} stroke={LIGHT} />
        </g>
      );
    case "Pareo":
    default:
      return (
        <g>
          <path d="M70 70 H170 L198 262 H42 Z" fill={FILL} {...stroke} />
          <path d={back ? "M120 70 V262" : "M70 70 Q122 150 154 262"} {...line} stroke={LIGHT} />
          <circle cx="76" cy="76" r="9" fill={FILL} {...stroke} />
          <path d="M76 84 L68 108 M76 84 L88 106" {...line} stroke={FILL} strokeWidth={3} />
        </g>
      );
  }
}

export function Garment({
  tipo,
  vista,
  className,
}: {
  tipo: Tipo;
  vista: Vista;
  className?: string;
}) {
  const side = vista === "costado";
  const zoom = vista === "principal";
  return (
    <svg viewBox="0 0 240 300" role="img" aria-hidden="true" className={className} preserveAspectRatio="xMidYMid meet">
      <ellipse cx="120" cy="280" rx="64" ry="6" fill="#000" opacity="0.07" />
      <g transform={zoom ? "translate(120 150) scale(1.12) translate(-120 -150)" : undefined}>
        <g transform={side ? "translate(120 0) scale(0.58 1) translate(-120 0)" : undefined}>
          <Shape tipo={tipo} vista={vista} />
        </g>
      </g>
    </svg>
  );
}
