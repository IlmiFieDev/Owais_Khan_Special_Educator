"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number | null;
  onChange: (value: number | null) => void;
  name?: string;
  invalid?: boolean;
  describedBy?: string;
}

export default function StarRating({
  value,
  onChange,
  name = "rating",
  invalid = false,
  describedBy,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const preview = hovered ?? value;
  const labels = ["Very Poor", "Poor", "Average", "Good", "Excellent"] as const;

  return (
    <div>
      <div
        role="radiogroup"
        aria-labelledby="feedback-rating-label"
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="star-rating flex flex-wrap items-center gap-1.5"
        onMouseLeave={() => setHovered(null)}
      >
      {[1, 2, 3, 4, 5].map((star) => {
        const checked = value === star;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={`${star} — ${labels[star - 1]}`}
            name={name}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(null)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                e.preventDefault();
                onChange(Math.min(5, (value ?? 0) + 1));
              }
              if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                e.preventDefault();
                onChange(Math.max(1, (value ?? 2) - 1));
              }
            }}
            className={`glow-interactive grid h-11 w-11 place-items-center rounded-xl border transition ${
              preview && star <= preview
                ? "border-peach bg-peach/45 text-ink shadow-soft"
                : "bg-sage/40 text-ink-muted hover:bg-sage"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              aria-hidden="true"
              fill={preview && star <= preview ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="m12 3 2.7 5.6 6.2.8-4.5 4.3 1.2 6.1L12 17.8 6.4 19.8l1.2-6.1L3.1 9.4l6.2-.8L12 3z" />
            </svg>
          </button>
        );
      })}
      </div>
      <p className="mt-2 min-h-5 text-sm font-semibold text-teal-dark" aria-live="polite">
        {preview ? `${preview} — ${labels[preview - 1]}` : "Select a rating from 1 to 5"}
      </p>
    </div>
  );
}
