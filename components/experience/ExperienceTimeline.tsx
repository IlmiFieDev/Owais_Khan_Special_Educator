"use client";

import { useState } from "react";
import GlowCard from "@/components/ui/GlowCard";
import { SITE_CONTENT } from "@/lib/content";

export default function ExperienceTimeline() {
  const institutional = SITE_CONTENT.experience.roles.filter(
    (r) => r.type === "institutional"
  );
  const clinic = SITE_CONTENT.experience.roles.filter((r) => r.type === "clinic");
  const independent = SITE_CONTENT.experience.roles.find((r) => r.type === "independent");
  const [openId, setOpenId] = useState<string | null>(institutional[0]?.id ?? null);

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <ol className="relative space-y-4 border-l-2 border-teal/25 pl-6">
        {institutional.map((role) => {
          const open = openId === role.id;
          return (
            <li key={role.id} className="relative">
              <span
                className={`absolute -left-[1.9rem] top-5 h-3.5 w-3.5 rounded-full border-2 border-frost ${
                  role.current
                    ? "bg-peach shadow-[0_0_0_4px_rgba(242,187,150,.35)]"
                    : "bg-teal"
                }`}
                aria-hidden="true"
              />
              <button
                type="button"
                className={`glow-interactive w-full rounded-soft border px-5 py-4 text-left transition ${
                  open
                    ? "border-teal/35 bg-frost/90 shadow-glow"
                    : "border-white/70 bg-frost/60 hover:border-teal/25"
                }`}
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : role.id)}
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-dark">
                  {role.years}
                </p>
                <h3 className="mt-1 font-heading text-xl font-semibold text-ink">
                  {role.organisation}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{role.role}</p>
                {open && (
                  <p className="mt-3 border-t border-ink/8 pt-3 text-sm leading-relaxed text-ink-soft">
                    {role.focus}
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <aside className="space-y-4">
        {independent && (
          <GlowCard glow="peach" className="border-l-4 border-l-peach">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-dark">Major milestone · {independent.years}</p>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-ink">{independent.organisation}</h3>
            <p className="mt-1 text-sm font-semibold text-teal-dark">{independent.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{independent.focus}</p>
          </GlowCard>
        )}
        <GlowCard>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-dark">
            Alongside
          </p>
          <h3 className="mt-2 font-heading text-xl font-semibold text-ink">
            Clinic collaboration
          </h3>
          {clinic.map((role) => (
            <div key={role.id} className="mt-4 border-t border-ink/8 pt-4">
              <p className="text-xs font-bold text-teal-dark">{role.years}</p>
              <p className="mt-1 font-semibold text-ink">{role.organisation}</p>
              <p className="mt-2 text-sm text-ink-muted">{role.focus}</p>
            </div>
          ))}
        </GlowCard>
        <GlowCard glow="peach">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-dark">
            Continuous learning
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Diploma in Special Education (ASD), NIEPMD, completed alongside professional practice between 2016 and 2018.
          </p>
        </GlowCard>
      </aside>
    </div>
  );
}
