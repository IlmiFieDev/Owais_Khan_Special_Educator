"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMotionDisabled } from "@/components/AccessibilityPanel/AccessibilityContext";
import { SITE_CONTENT, type DisabilityCard as CardType } from "@/lib/content";

function getDisabilityIcon(icon: string) {
  switch (icon) {
    case "autism-infinity":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.267-8-12.362-8-5.096 0-5.096 8 0 8 5.095 0 7.267-8 12.362-8z" />
        </svg>
      );
    case "sun-heart":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case "puzzle-star":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M12 3v4a2 2 0 0 0 0 4V3M21 12h-4a2 2 0 0 0-4 0h8" />
        </svg>
      );
    case "book-open":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case "sprout":
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
      );
  }
}

interface SingleCardProps {
  card: CardType;
  reduceMotion: boolean;
}

function CardItem({ card, reduceMotion }: SingleCardProps) {
  const [flipped, setFlipped] = useState(false);

  // If reduced motion is active, do not flip: show combined accessible card
  if (reduceMotion) {
    return (
      <div className="p-6 rounded-large bg-surface border border-teal/15 shadow-card flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-4">
            {getDisabilityIcon(card.icon)}
          </div>
          <h3 className="font-heading text-xl font-bold text-ink mb-2">
            {card.title}
          </h3>
          <p className="font-body text-sm text-ink/75 leading-relaxed mb-4">
            {card.shortDescription}
          </p>
        </div>
        <div className="pt-3 border-t border-teal/10">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal mb-2">Key Focus Areas:</p>
          <ul className="text-xs font-body text-ink/70 space-y-1 list-disc list-inside">
            {card.focusAreas.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      tabIndex={0}
      role="button"
      aria-expanded={flipped}
      aria-label={`${card.title}. Click or tap to view focus areas.`}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped(!flipped);
        }
      }}
      className="group relative h-80 rounded-large [perspective:1000px] cursor-pointer focus-visible:ring-2 focus-visible:ring-teal rounded-large outline-none"
    >
      <motion.div
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full h-full relative [transform-style:preserve-3d] transition-all rounded-large"
      >
        {/* Front Face */}
        <div className="absolute inset-0 p-6 sm:p-7 rounded-large bg-surface border border-teal/15 shadow-card flex flex-col justify-between [backface-visibility:hidden]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-5 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
              {getDisabilityIcon(card.icon)}
            </div>
            <h3 className="font-heading text-xl font-bold text-ink mb-3 leading-snug">
              {card.title}
            </h3>
            <p className="font-body text-sm text-ink/75 leading-relaxed">
              {card.shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-teal/10 text-xs font-semibold text-teal">
            <span>Tap to see focus areas</span>
            <span className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 p-6 sm:p-7 rounded-large bg-teal-dark text-white shadow-soft flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/20">
              <span className="text-xs uppercase tracking-wider text-yellow font-bold">Specialised Support</span>
              <span className="text-xs text-white/70">Click to flip</span>
            </div>
            <h4 className="font-heading text-lg font-bold text-white mb-3">
              {card.title}
            </h4>
            <ul className="space-y-2 text-sm text-white/85 font-body">
              {card.focusAreas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-yellow text-sm mt-0.5">✓</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/60 italic font-body">
            Individualised for every child
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function DisabilityCards() {
  const reduceMotion = useMotionDisabled();
  const w = SITE_CONTENT.whoIWorkWith;

  return (
    <section
      id="specialisations"
      className="editorial-section px-4 bg-cream"
      aria-labelledby="specialisations-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-doodle text-xl text-teal font-medium mb-1 tracking-wide">
            {w.sectionTag}
          </p>
          <h2
            id="specialisations-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-4 leading-tight"
          >
            {w.title}
          </h2>
          <p className="font-body text-ink/70 text-base sm:text-lg">
            {w.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {w.cards.map((card) => (
            <CardItem key={card.id} card={card} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
