"use client";
import { useState, useRef, useEffect } from "react";
import { SITE_CONTENT } from "@/lib/content";
import { useA11y, type TextSize } from "./AccessibilityContext";

const TEXT_SIZES: { value: TextSize; labelKey: keyof typeof SITE_CONTENT.a11y }[] = [
  { value: "sm", labelKey: "small" },
  { value: "md", labelKey: "medium" },
  { value: "lg", labelKey: "large" },
  { value: "xl", labelKey: "xLarge" },
];

function Row({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-body text-ink">{label}</span>
        <button type="button" role="switch" aria-label={label} aria-checked={checked} onClick={onChange}
        className={`glow-interactive relative shrink-0 w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${checked ? "bg-teal" : "bg-gray-200"}`}>
        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const t = SITE_CONTENT.a11y;
  const { reduceMotion, dyslexiaFont, textSize, highContrast, calmMode, update } = useA11y();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Trap focus inside panel when open
  useEffect(() => {
    if (!open) return;
    const el = panelRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab") {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="relative z-50">
      {/* Trigger */}
      <button
        ref={triggerRef}
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className="glow-interactive flex items-center justify-center w-10 h-10 rounded-full bg-white/80 border border-teal/20 text-teal hover:bg-teal hover:text-white transition-colors shadow-soft focus-visible:ring-2 focus-visible:ring-teal"
      >
        {/* Universal Accessibility Person Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <path
            d="M12 7c-3 0-7 1-7 1l1 2 4-1v3l-3 6h2l2-4 1 1v3h2v-3l1-1 2 4h2l-3-6V9l4 1 1-2s-4-1-7-1z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Panel */}
      {open && (
          <div
            ref={panelRef}
            role="dialog"
            aria-label={t.title}
            aria-modal="true"
            className="fixed top-20 right-4 sm:absolute sm:top-auto sm:right-0 mt-2 w-72 max-h-[75vh] overflow-y-auto bg-white rounded-large shadow-card border border-teal/10 p-5 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold text-teal">{t.title}</h2>
              <button
                aria-label={t.close}
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="glow-interactive text-ink/50 hover:text-coral transition-colors focus-visible:ring-2 focus-visible:ring-teal rounded p-1"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <Row
                label={t.reduceMotion}
                checked={reduceMotion}
                onChange={() => update("reduceMotion", !reduceMotion)}
              />
              <Row
                label={t.dyslexiaFont}
                checked={dyslexiaFont}
                onChange={() => update("dyslexiaFont", !dyslexiaFont)}
              />
              <Row
                label={t.highContrast}
                checked={highContrast}
                onChange={() => update("highContrast", !highContrast)}
              />
              <Row
                label={t.calmMode}
                checked={calmMode}
                onChange={() => update("calmMode", !calmMode)}
              />
            </div>

            {/* Text size selector */}
            <div>
              <p className="text-sm font-body text-ink mb-2">{t.textSize}</p>
              <div className="flex gap-2">
                {TEXT_SIZES.map(({ value, labelKey }) => (
                  <button
                    key={value}
                    aria-pressed={textSize === value}
                    onClick={() => update("textSize", value)}
                    className={`glow-interactive flex-1 py-1 rounded-card text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-teal ${
                      textSize === value
                        ? "bg-teal text-white shadow-sm"
                        : "bg-cream text-ink hover:bg-teal/10"
                    }`}
                  >
                    {String(t[labelKey])}
                  </button>
                ))}
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
