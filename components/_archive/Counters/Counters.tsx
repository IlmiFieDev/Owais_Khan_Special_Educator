"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionDisabled } from "@/components/AccessibilityPanel/AccessibilityContext";
import { SITE_CONTENT } from "@/lib/content";

function getCounterIcon(icon: string) {
  switch (icon) {
    case "calendar":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "school":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "heart":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "family":
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="7" r="4" />
          <path d="M17 11a3 3 0 1 0-2.82-4" />
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          <path d="M17 17a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3" />
        </svg>
      );
  }
}

interface CounterCardProps {
  value: number;
  suffix?: string;
  label: string;
  icon: string;
  reduceMotion: boolean;
}

function CounterCard({ value, suffix = "", label, icon, reduceMotion }: CounterCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const cardRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 1600; // ms
          const start = performance.now();

          const animate = (time: number) => {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutProgress * value);
            setDisplayValue(current);

            if (progress < 1) {
              frame = requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          frame = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, reduceMotion]);

  return (
    <div
      ref={cardRef}
      className="motion-hover editorial-card relative p-6 sm:p-8 bg-surface hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center">
          {getCounterIcon(icon)}
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow" aria-hidden="true" />
      </div>

      <div>
        <p className="font-heading text-4xl sm:text-5xl font-bold text-ink tracking-tight mb-2">
          <span className="sr-only">{value}{suffix}</span>
          <span aria-hidden="true" data-counter-value>{displayValue}<span className="text-teal font-serif">{suffix}</span></span>
        </p>
        <p className="font-body text-sm sm:text-base font-medium text-ink/70 leading-snug">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function Counters() {
  const reduceMotion = useMotionDisabled();
  const c = SITE_CONTENT.counters;

  // Filter out any counter with value null/undefined/unset (gracefully handles TODO_CLIENT_VALUE)
  const activeCounters = c.items.filter(
    (item): item is typeof item & { value: number } => item.value !== null && item.value !== undefined
  );

  return (
    <section
      id="counters"
      className="editorial-section px-4 bg-cream"
      aria-label="Experience & Impact Counters"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-doodle text-xl text-teal font-medium mb-1 tracking-wide">
            {c.sectionTag}
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-ink leading-tight">
            {c.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {activeCounters.map((item) => (
            <CounterCard
              key={item.id}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              icon={item.icon}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
