"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getProduct } from "@/data/products";
import { Garment } from "./garment";
import { useQuote } from "./quote-context";

type Errors = Partial<Record<"nombre" | "correo" | "telefono", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: { nombre: string; correo: string; telefono: string }): Errors {
  const e: Errors = {};
  if (v.nombre.trim().length < 2) e.nombre = "Escribe tu nombre.";
  if (!EMAIL_RE.test(v.correo.trim())) e.correo = "Escribe un correo válido, como nombre@empresa.com.";
  if (v.telefono.replace(/\D/g, "").length < 10) e.telefono = "Escribe un teléfono de 10 dígitos.";
  return e;
}

export function QuoteSheet() {
  const { codes, remove, clear, open, setOpen } = useQuote();
  const uid = useId();
  const reduce = useReducedMotion();
  const [values, setValues] = useState({ nombre: "", correo: "", telefono: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ count: number } | null>(null);
  const [trap, setTrap] = useState("");

  const items = useMemo(() => codes.map((c) => getProduct(c)).filter((p): p is NonNullable<typeof p> => Boolean(p)), [codes]);

  function onOpenChange(o: boolean) {
    setOpen(o);
    if (!o && sent) setSent(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = (["nombre", "correo", "telefono"] as const).find((k) => errs[k]);
      if (first) document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (items.length === 0) return;
    setSending(true);
    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, modelos: codes, website: trap }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(typeof data.error === "string" ? data.error : "No se pudo enviar.");
      }
      setSent({ count: items.length });
      clear();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo enviar.", {
        description: "Intenta de nuevo o escríbenos por WhatsApp.",
      });
    } finally {
      setSending(false);
    }
  }

  const field = (name: "nombre" | "correo" | "telefono", label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={`${uid}-${name}`} className="text-[15px] font-medium text-foreground">
        {label}
      </label>
      <input
        id={`${uid}-${name}`}
        name={name}
        value={values[name]}
        onChange={(e) => {
          setValues((v) => ({ ...v, [name]: e.target.value }));
          if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
        }}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${uid}-${name}-err` : undefined}
        className={`mt-1.5 block min-h-12 w-full rounded-lg border border-muted/50 bg-background px-4 text-[16px] text-foreground transition-colors placeholder:text-muted/70 hover:border-foreground focus:border-foreground aria-[invalid=true]:border-brand ${errors[name] ? "shake" : ""}`}
        {...props}
      />
      <AnimatePresence initial={false}>
        {errors[name] && (
          <motion.p
            id={`${uid}-${name}-err`}
            initial={{ opacity: 0, y: reduce ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="mt-1.5 text-sm font-medium text-brand"
          >
            {errors[name]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent variant="right" closeLabel="Cerrar mi cotización">
        {sent ? (
          <div className="flex flex-1 flex-col items-start justify-center p-8">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="text-muted">
              <motion.circle cx="28" cy="28" r="25" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }} />
              <motion.path d="M17 29.5 L25 37 L39.5 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.45, ease: "easeOut" }} />
            </svg>
            <DialogTitle className="mt-6 font-display text-[2rem] leading-tight text-foreground">Solicitud enviada</DialogTitle>
            <DialogDescription className="mt-3 text-[17px] leading-relaxed text-foreground">
              Recibimos {sent.count === 1 ? "1 modelo" : `${sent.count} modelos`}. El equipo de Faro Sur te contactará al correo y
              teléfono que dejaste.
            </DialogDescription>
            <button type="button" className="btn btn-solid mt-8" onClick={() => onOpenChange(false)}>
              Seguir explorando
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
            <div className="border-b border-line px-6 pb-5 pt-6 pr-16">
              <DialogTitle className="font-display text-[1.75rem] leading-tight text-foreground">Tu cotización</DialogTitle>
              <DialogDescription className="mt-1 text-[15px] text-muted">
                Elige los modelos y deja tus datos. No necesitas indicar cantidades.
              </DialogDescription>
            </div>

            <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <p className="rounded-frame border border-dashed border-clay px-5 py-8 text-center text-[15px] text-muted">
                  Aún no hay modelos en tu lista. Cierra este panel y agrega los que te interesen.
                </p>
              ) : (
                <ul className="divide-y divide-line" aria-label="Modelos seleccionados">
                  <AnimatePresence initial={false}>
                  {items.map((p) => (
                    <motion.li
                      key={p.code}
                      layout={reduce ? false : "position"}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, x: reduce ? 0 : 48 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-clip"
                    >
                    <div className="flex items-center gap-4 py-3">
                      <div className="h-16 w-14 shrink-0 overflow-clip rounded-lg bg-surface">
                        <Garment tipo={p.tipo} vista="frente" className="h-full w-full p-1" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold tracking-wide text-muted">{p.code}</p>
                        <p className="truncate font-display text-lg leading-tight text-foreground">{p.name}</p>
                        <p className="truncate text-sm text-muted">
                          {p.tipo} · {p.genero}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(p.code)}
                        aria-label={`Quitar ${p.name}, ${p.code}`}
                        className="press inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-clay/25 hover:text-foreground"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                    </motion.li>
                  ))}
                  </AnimatePresence>
                </ul>
              )}

              <div className="mt-6 space-y-4">
                {field("nombre", "Nombre", { type: "text", autoComplete: "name", placeholder: "Tu nombre completo" })}
                {field("correo", "Correo", { type: "email", autoComplete: "email", inputMode: "email", placeholder: "nombre@empresa.com" })}
                {field("telefono", "Teléfono", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "999 123 4567" })}
                <div aria-hidden="true" className="sr-only">
                  <label>
                    No llenar este campo
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                  </label>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Compra mínima de 25 piezas por modelo. Sin precios publicados: el equipo te responde con la cotización.
              </p>
            </div>

            <div className="border-t border-line bg-background px-6 py-4">
              <button type="submit" disabled={items.length === 0 || sending} className="btn btn-solid w-full disabled:cursor-not-allowed disabled:opacity-50">
                {sending ? <Loader2 size={18} className="animate-spin" /> : null}
                {sending ? "Enviando…" : `Pedir mi cotización${items.length ? ` (${items.length})` : ""}`}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
