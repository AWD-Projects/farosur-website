/**
 * Wordmark de Faro Sur en texto (Montserrat: FARO en 700, SUR en 300).
 * Vectorial: se ve nítido en cualquier tamaño y pantalla.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Faro Sur"
      className={`inline-block select-none whitespace-nowrap font-logo leading-none tracking-[-0.035em] text-brand ${className}`}
    >
      <span aria-hidden="true" className="font-bold">FARO</span>
      <span aria-hidden="true" className="font-light">SUR</span>
    </span>
  );
}
