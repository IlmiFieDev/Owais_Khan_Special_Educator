"use client";
import { useState, useRef } from "react";
import { SITE_CONTENT, type ApproachStep } from "@/lib/content";

function getStepIcon(icon: string) {
  switch (icon) {
    case "search":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "map":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      );
    case "blocks":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="9" height="9" rx="1.5" />
          <rect x="13" y="3" width="9" height="9" rx="1.5" />
          <rect x="2" y="14" width="9" height="9" rx="1.5" />
          <rect x="13" y="14" width="9" height="9" rx="1.5" />
        </svg>
      );
    case "chart":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    case "heart-hand":
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
  }
}

export default function ApproachCircle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const a = SITE_CONTENT.approach;
  const steps = a.steps;
  const currentStep = steps[activeIndex];
  const stepButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation for accessible tabs / circle items
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % steps.length;
      setActiveIndex(next);
      stepButtonsRef.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + steps.length) % steps.length;
      setActiveIndex(prev);
      stepButtonsRef.current[prev]?.focus();
    }
  };

  // 5 nodes placed evenly along 360 degrees (starting top = -90deg)
  const radius = 175; // px from center
  const angleStep = 360 / steps.length;

  return (
    <section
      id="approach"
      className="editorial-section px-4 bg-forest text-white"
      aria-labelledby="approach-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-doodle text-xl text-yellow font-medium mb-1 tracking-wide">
            {a.sectionTag}
          </p>
          <h2
            id="approach-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
          >
            {a.title}
          </h2>
          <p className="font-body text-white/75 text-base sm:text-lg">
            {a.subtitle}
          </p>
        </div>

        {/* Desktop & Tablet: Interactive Circle Diagram */}
        <div className="hidden md:flex flex-col items-center justify-center relative min-h-[500px]">
          {/* Subtle Outer Guide Rings */}
          <div
            className="absolute w-[380px] h-[380px] rounded-full border border-white/20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-white/20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Center Card Showing Active Step Info */}
          <div
            key={currentStep.step}
            id={`approach-panel-${activeIndex}`}
            role="tabpanel"
            aria-labelledby={`approach-tab-${activeIndex}`}
            className="content-enter relative z-10 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-white shadow-soft border-2 border-teal/20 p-8 flex flex-col items-center justify-center text-center"
            aria-live="polite"
          >
            <span className="w-9 h-9 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold font-heading mb-2 shadow-sm">
              0{currentStep.step}
            </span>
            <p className="font-heading text-2xl font-bold text-ink mb-1">
              {currentStep.title}
            </p>
            <p className="text-xs uppercase tracking-wider text-teal font-semibold font-body mb-2.5">
              {currentStep.subtitle}
            </p>
            <p className="font-body text-xs sm:text-sm text-ink/75 leading-relaxed line-clamp-4">
              {currentStep.description}
            </p>
          </div>

          {/* 5 Outer Step Buttons placed along perimeter */}
          <div role="tablist" aria-label="Five-step approach stages" className="absolute inset-0">
            {steps.map((stepItem: ApproachStep, i: number) => {
              const angleDeg = -90 + i * angleStep;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = Math.round(radius * Math.cos(angleRad));
              const y = Math.round(radius * Math.sin(angleRad));
              const isActive = activeIndex === i;

              return (
                <button
                  key={stepItem.step}
                  ref={(el) => {
                    stepButtonsRef.current[i] = el;
                  }}
                  role="tab"
                  id={`approach-tab-${i}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  aria-controls={`approach-panel-${i}`}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  className={`absolute left-1/2 top-1/2 flex items-center gap-2 px-3.5 py-2 rounded-full font-body text-sm font-semibold transition-all duration-300 shadow-card focus-visible:ring-2 focus-visible:ring-teal ${
                    isActive
                      ? "bg-yellow text-forest scale-110 shadow-soft ring-4 ring-yellow/25 z-20"
                      : "bg-surface text-ink/80 hover:bg-teal-light hover:text-teal z-10"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isActive ? "bg-forest text-yellow" : "bg-teal/10 text-teal"
                  }`}>
                    {getStepIcon(stepItem.icon)}
                  </span>
                  <span>{stepItem.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile View: Vertical Step List with Tabs */}
        <div className="md:hidden flex flex-col gap-4">
          {steps.map((stepItem, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={stepItem.step}
                className={`rounded-card transition-all duration-200 border ${
                  isActive
                    ? "bg-white border-teal shadow-soft p-5 ring-2 ring-teal/20"
                    : "bg-white/70 border-teal/10 p-4"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveIndex(i)}
                  className="w-full flex items-center justify-between text-left focus-visible:ring-2 focus-visible:ring-teal rounded"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isActive ? "bg-teal text-white" : "bg-teal/10 text-teal"
                      }`}
                    >
                      {stepItem.step}
                    </span>
                    <div>
                      <p className="font-heading text-lg font-bold text-ink">
                        {stepItem.title}
                      </p>
                      <p className="text-xs text-teal font-semibold font-body">
                        {stepItem.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-teal font-medium text-sm">
                    {isActive ? "−" : "+"}
                  </span>
                </button>

                {isActive && (
                  <div className="mt-3 pt-3 border-t border-teal/10 text-sm font-body text-ink/80 leading-relaxed">
                    {stepItem.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
