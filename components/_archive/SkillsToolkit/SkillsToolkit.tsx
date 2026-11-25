"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMotionDisabled } from "@/components/AccessibilityPanel/AccessibilityContext";
import { SITE_CONTENT, type SkillItem } from "@/lib/content";

function getCategoryBadge(cat: SkillItem["category"]) {
  switch (cat) {
    case "core":
      return { label: "Core Clinical", bg: "bg-teal/10 text-teal border-teal/20" };
    case "method":
      return { label: "Pedagogical Method", bg: "bg-sky/20 text-sky-800 border-sky/30" };
    case "soft":
    default:
      return { label: "Interpersonal & Ethics", bg: "bg-yellow/20 text-amber-800 border-yellow/30" };
  }
}

export default function SkillsToolkit() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const reduceMotion = useMotionDisabled();
  const s = SITE_CONTENT.skills;

  return (
    <section
      id="skills"
      className="editorial-section px-4 bg-white"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-doodle text-xl text-teal font-medium mb-1 tracking-wide">
            {s.sectionTag}
          </p>
          <h2
            id="skills-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-4 leading-tight"
          >
            {s.title}
          </h2>
          <p className="font-body text-ink/70 text-base sm:text-lg">
            {s.subtitle}
          </p>
        </div>

        {/* Interactive Toolbox Grid (No percentage bars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {s.items.map((skill: SkillItem) => {
            const badge = getCategoryBadge(skill.category);
            const isSelected = selectedSkill === skill.id;

            return (
              <motion.div
                key={skill.id}
                tabIndex={0}
                role="button"
                aria-expanded={isSelected}
                onClick={() => setSelectedSkill(isSelected ? null : skill.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedSkill(isSelected ? null : skill.id);
                  }
                }}
                initial={false}
                animate={{ y: 0, rotate: 0 }}
                whileHover={reduceMotion ? { y: 0, rotate: 0 } : { y: -4, rotate: 0.5 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                className={`editorial-card relative group p-6 bg-surface transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                  isSelected
                    ? "border-teal ring-2 ring-teal/20 shadow-soft bg-white"
                    : "border-forest/15 hover:border-teal/40 hover:shadow-cardHover"
                }`}
              >
                {/* Sparkle icon accent on hover */}
                <div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-yellow"
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                  </svg>
                </div>

                <div className="mb-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badge.bg} font-body`}
                  >
                    {badge.label}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-ink mb-2.5 pr-4 leading-snug group-hover:text-teal transition-colors">
                  {skill.name}
                </h3>

                <p className="font-body text-sm text-ink/75 leading-relaxed">
                  {skill.explanation}
                </p>

                <div className="mt-4 pt-3 border-t border-teal/10 flex items-center justify-between text-[11px] text-ink/50 font-body">
                  <span>Methodology</span>
                  <span className="text-teal font-semibold group-hover:underline">
                    {isSelected ? "Active" : "Tap to focus"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
