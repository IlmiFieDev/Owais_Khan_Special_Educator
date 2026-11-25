"use client";

import { useRef, useState } from "react";
import { LineIcon } from "@/components/ui/Icons";
import { SITE_CONTENT } from "@/lib/content";

export default function ApproachJourney() {
  const steps = SITE_CONTENT.approach.steps;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = steps[active];

  return (
    <div className="mt-10">
      <ol className="grid gap-3 md:grid-cols-5" aria-label="Teaching approach steps" role="tablist">
        {steps.map((step, index) => {
          const isActive = active === index;
          return (
            <li key={step.step} className="relative">
              <button
                ref={(node) => { tabRefs.current[index] = node; }}
                type="button"
                onClick={() => setActive(index)}
                role="tab"
                aria-selected={isActive}
                aria-controls="approach-detail-panel"
                id={`approach-step-${index + 1}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(event) => {
                  if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
                  event.preventDefault();
                  const next = event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? steps.length - 1
                      : ["ArrowRight", "ArrowDown"].includes(event.key)
                        ? (index + 1) % steps.length
                        : (index - 1 + steps.length) % steps.length;
                  setActive(next);
                  tabRefs.current[next]?.focus();
                }}
                className={`glow-interactive flex w-full items-center gap-4 rounded-soft border px-4 py-3 text-left transition md:min-h-[10.5rem] md:flex-col md:justify-center md:gap-0 md:text-center ${
                  isActive
                    ? "border-teal/40 bg-teal text-white shadow-glow"
                    : "border-white/70 bg-frost/70 text-ink backdrop-blur hover:border-teal/30"
                }`}
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full md:mb-3 md:h-14 md:w-14 ${
                    isActive ? "bg-white/15" : "bg-sage/70 text-teal-dark"
                  }`}
                >
                  <LineIcon name={step.icon} className="h-7 w-7" />
                </span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] opacity-80">
                  Step {String(step.step).padStart(2, "0")}
                </span>
                <strong className="mt-1 font-heading text-lg font-semibold">
                  {step.title}
                </strong>
                <span className={`mt-1 text-xs ${isActive ? "text-white/85" : "text-ink-muted"}`}>
                  {step.subtitle}
                </span>
              </button>
              {index < steps.length - 1 && (
                <span
                  className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 text-teal md:block"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div
        id="approach-detail-panel"
        role="tabpanel"
        aria-labelledby={`approach-step-${active + 1}`}
        className="glow-card mt-6 rounded-soft border border-white/70 bg-frost/75 p-6 shadow-soft backdrop-blur-xl"
        aria-live="polite"
      >
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-dark">
          {current.title} — {current.subtitle}
        </p>
        <p className="mt-2 font-heading text-2xl font-semibold text-ink">
          {current.description}
        </p>
        <p className="mt-3 max-w-3xl text-ink-muted">{current.detail}</p>
      </div>
    </div>
  );
}
