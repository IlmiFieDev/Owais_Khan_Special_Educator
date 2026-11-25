import type { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glow?: "teal" | "peach" | "none";
  as?: "div" | "article" | "aside";
}

export default function GlowCard({
  children,
  className = "",
  glow = "teal",
  as: Tag = "div",
}: GlowCardProps) {
  const glowClass =
    glow === "teal"
      ? "hover:shadow-glow"
      : glow === "peach"
        ? "hover:shadow-glow-peach"
        : "";

  return (
    <Tag
      className={`glow-card relative rounded-soft border border-white/70 bg-frost/55 p-6 shadow-soft backdrop-blur-xl transition duration-300 ${glowClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
