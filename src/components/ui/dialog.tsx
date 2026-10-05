"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

type Variant = "center" | "right" | "left";

const variants: Record<Variant, string> = {
  center:
    "dlg-center left-1/2 top-1/2 max-h-[calc(100dvh-2rem)] w-[calc(100vw-1.5rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-frame",
  right: "dlg-right inset-y-0 right-0 w-full max-w-[28rem] border-l border-line",
  left: "dlg-left inset-y-0 left-0 w-full max-w-[22rem] border-r border-line",
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { variant?: Variant; closeLabel?: string }
>(({ className, children, variant = "center", closeLabel = "Cerrar", ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="dlg-overlay fixed inset-0 z-[60] bg-night/55" />
    <DialogPrimitive.Content
      ref={ref}
      data-lenis-prevent
      className={cn(
        "fixed z-[61] flex flex-col overflow-hidden bg-background text-foreground shadow-2xl",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        aria-label={closeLabel}
        className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-muted transition-colors hover:bg-foreground hover:text-white"
      >
        <X size={20} strokeWidth={1.5} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription };
