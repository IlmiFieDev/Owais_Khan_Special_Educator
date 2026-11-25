"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { useMotionDisabled } from "@/components/AccessibilityPanel/AccessibilityContext";
import { SITE_CONTENT, type CredentialItem } from "@/lib/content";

export default function Credentials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useMotionDisabled();
  const c = SITE_CONTENT.credentials;

  useEffect(() => {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const cards = containerRef.current?.querySelectorAll(".credential-card");
    if (!cards) return;

    // Add a transform-only enhancement on entry; cards are never hidden offscreen.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("credential-enter");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      cards.forEach((card) => card.classList.remove("credential-enter"));
    };
  }, [reduceMotion]);

  return (
    <section
      id="credentials"
      className="editorial-section px-4 bg-teal-light"
      aria-labelledby="credentials-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-doodle text-xl text-teal font-medium mb-1 tracking-wide">
            {c.sectionTag}
          </p>
          <h2
            id="credentials-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-4 leading-tight"
          >
            {c.title}
          </h2>
          <p className="font-body text-ink/70 text-base sm:text-lg">
            {c.subtitle}
          </p>
        </div>

        {/* Credentials Cards Stack / Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12"
        >
          {c.cards.map((item: CredentialItem, index: number) => {
            const isRci = item.badge === "Statutory Credential";
            return (
              <div
                key={index}
                style={{ "--card-rotation": `${index % 2 === 0 ? -3 : 3}deg`, animationDelay: `${index * 150}ms` } as CSSProperties}
                className={`credential-card editorial-card relative p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between ${
                  isRci
                    ? "bg-white border-teal/30 ring-2 ring-teal/20"
                    : "bg-surface border-teal/10 hover:border-teal/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-body border ${
                        isRci
                          ? "bg-teal text-white border-teal"
                          : "bg-teal/10 text-teal border-teal/20"
                      }`}
                    >
                      {item.badge || "Verified"}
                    </span>
                    <span className="text-xs font-semibold text-ink/50 font-body">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-ink mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm font-medium text-teal mb-3">
                    {item.institution}
                  </p>
                  {item.description && (
                    <p className="font-body text-xs sm:text-sm text-ink/70 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-teal/10 flex items-center justify-between text-xs text-ink/50 font-body">
                  <span>Verified Credential</span>
                  <span className="text-teal font-semibold">Delhi NCR</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills Callout Banner */}
        <div className="rounded-large bg-white border border-teal/20 p-6 text-center max-w-3xl mx-auto shadow-sm">
          <p className="font-body text-sm sm:text-base text-ink/80">
            {c.additionalSkills}
          </p>
        </div>
      </div>
    </section>
  );
}
