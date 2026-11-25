"use client";

import { useMotionDisabled } from "@/components/AccessibilityPanel/AccessibilityContext";

interface MeshBackgroundProps {
  variant?: "hero" | "page" | "soft";
  className?: string;
}

export default function MeshBackground({
  variant = "page",
  className = "",
}: MeshBackgroundProps) {
  const motionOff = useMotionDisabled();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`absolute -top-24 -left-16 h-[28rem] w-[28rem] rounded-full bg-sage/70 blur-3xl ${
          motionOff ? "" : "animate-mesh-drift"
        }`}
      />
      <div
        className={`absolute top-10 right-[-8%] h-[24rem] w-[24rem] rounded-full bg-sky/80 blur-3xl ${
          motionOff ? "" : "animate-mesh-drift"
        }`}
        style={{ animationDelay: "-6s" }}
      />
      <div
        className={`absolute bottom-[-10%] left-[30%] h-[22rem] w-[22rem] rounded-full bg-peach/40 blur-3xl ${
          motionOff ? "" : "animate-glow-pulse"
        }`}
      />
      {variant === "hero" && (
        <div className="absolute inset-0 bg-mesh-hero opacity-90" />
      )}
      {variant === "soft" && (
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-frost/40 to-sage/30" />
      )}
    </div>
  );
}
