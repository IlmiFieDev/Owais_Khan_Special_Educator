"use client";
import { useEffect, useRef } from "react";
import { useA11y } from "@/components/AccessibilityPanel/AccessibilityContext";

/**
 * A hand-drawn SVG path that gracefully winds across the full viewport as the user scrolls,
 * decorated with milestone icons (seedling, blocks, puzzle, lightbulb, star).
 * Placed behind the main sections so it doesn't overlap text or cards.
 * Respects prefers-reduced-motion and Calm Mode.
 */
export default function GrowingPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const { reduceMotion, calmMode } = useA11y();

  useEffect(() => {
    if (reduceMotion || calmMode) return;

    let disposed = false;
    let context: ReturnType<typeof import("gsap").gsap.context> | undefined;

    async function init() {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      if (disposed) return;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      context = gsap.context(() => {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      });
    }

    // This decoration must never prevent the page from rendering.
    void init().catch(() => context?.revert());

    return () => {
      disposed = true;
      context?.revert();
    };
  }, [reduceMotion, calmMode]);

  if (calmMode) return null;

  return (
    <div
      aria-hidden="true"
      className="motion-decoration pointer-events-none fixed inset-0 w-full h-full z-0 overflow-hidden"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 4000"
        preserveAspectRatio="none"
        style={{ opacity: 0.16 }}
      >
        <path
          ref={pathRef}
          d="
            M 15 0
            C 25 300, 8 600, 15 900
            C 22 1200, 5 1500, 12 1800
            C 20 2100, 8 2400, 15 2700
            C 22 3000, 6 3300, 14 3600
            C 20 3800, 12 3900, 15 4000
          "
          fill="none"
          stroke="#2FA37A"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Milestone Decorative Visual Markers along the line */}
        {/* Milestone 1: Seedling at top */}
        <circle cx="15" cy="450" r="2.5" fill="#2FA37A" opacity="0.6" />
        {/* Milestone 2: Building Block */}
        <rect x="13" y="1150" width="4" height="4" rx="0.8" fill="#FFC83D" opacity="0.7" />
        {/* Milestone 3: Puzzle Piece node */}
        <circle cx="12" cy="1950" r="2.8" fill="#7CC6F2" opacity="0.7" />
        {/* Milestone 4: Lightbulb idea node */}
        <circle cx="15" cy="2750" r="2.5" fill="#FFC83D" opacity="0.7" />
        {/* Milestone 5: Star achievement node */}
        <circle cx="14" cy="3550" r="3" fill="#FF7A66" opacity="0.7" />
      </svg>
    </div>
  );
}
