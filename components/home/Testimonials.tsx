"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  author: string;
  relationship: string;
  rating: number;
  message: string;
}

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/testimonials", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : { items: [] })
      .then((payload: { items?: Testimonial[] }) => setItems(payload.items ?? []))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  if (!items.length) return null;

  return (
    <section className="bg-ink py-14 text-frost sm:py-16" aria-labelledby="testimonials-heading">
      <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-peach">Approved feedback</p>
        <h2 id="testimonials-heading" className="mt-3 font-heading text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold text-frost">
          Reflections from families and collaborators
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="rounded-soft border border-white/10 bg-white/[.06] p-5">
              <div className="text-peach" aria-label={`${item.rating} out of 5 stars`}>
                {"★".repeat(item.rating)}<span className="text-white/20">{"★".repeat(5 - item.rating)}</span>
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-sage/90">“{item.message}”</blockquote>
              <figcaption className="mt-4 text-xs font-semibold text-peach">{item.author} · {item.relationship}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
