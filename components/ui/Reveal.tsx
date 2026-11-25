import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function Reveal({
  children,
  className = "",
  delay: _delay = 0,
  y: _y = 18,
}: RevealProps) {
  // Animate position only — never opacity — so content cannot render invisible.
  return <div className={className}>{children}</div>;
}
