"use client";
import { useState } from "react";

const roles = [
  ["2009–2012", "Tamana Special School", "Autism, Down syndrome and inclusion programmes."],
  ["2012", "Shaura Centre", "Remedial literacy and numeracy interventions."],
  ["2013–2014", "FSMHP Udaan (J.R.C.)", "Intellectual Disability, IEP delivery and documentation."],
  ["2014–2016", "Rhythm Play School", "Early intervention, teaching aids and inclusion."],
  ["2016–2018", "The Manthan School", "Individual and group sessions with therapist and parent collaboration."],
  ["Present", "Enable 361", "Special Educator — role details to be confirmed."],
] as const;
const alongside = [["2014–2018", "Adhaar Clinic, Noida", "Assessments, parent training, and speech and OT collaboration."], ["After 2018–present", "Independent practice, Delhi NCR", "One-to-one, session-based tuitions."]] as const;

export default function CareerJourney() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="journey" className="editorial-section bg-teal-light px-4" aria-labelledby="journey-heading"><div className="mx-auto max-w-[1200px]"><div className="mx-auto mb-14 max-w-2xl text-center"><p className="font-doodle text-xl text-teal">Career journey</p><h2 id="journey-heading" className="mt-2 font-heading text-4xl font-semibold text-forest sm:text-5xl">A practice built, step by step.</h2><p className="mt-4 text-ink/70">Fifteen years of supporting learners, families, schools and clinics.</p></div><div className="relative mx-auto max-w-4xl border-l border-forest/25 pl-7 sm:pl-12">{roles.map(([years, place, focus], index) => <article key={place} className="relative mb-7"><span className={`absolute -left-[35px] top-6 h-4 w-4 rounded-full border-4 border-teal-light ${years === "Present" ? "bg-yellow animate-pulse" : "bg-teal"}`} aria-hidden="true"/><button onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} className="editorial-card w-full bg-white p-6 text-left transition hover:-translate-y-0.5 hover:shadow-cardHover"><span className="text-sm font-semibold text-teal">{years}</span><h3 className="mt-1 font-heading text-2xl font-semibold text-forest">{place}</h3><p className="mt-2 text-sm text-ink/70">Special Educator</p>{open === index && <p className="mt-4 border-t border-forest/10 pt-4 text-sm leading-relaxed text-ink/80">{focus}</p>}</button></article>)}</div><div className="mx-auto mt-12 max-w-4xl"><p className="mb-4 font-doodle text-xl text-forest">Alongside</p><div className="grid gap-4 md:grid-cols-2">{alongside.map(([years, place, focus]) => <article key={place} className="editorial-card bg-white/80 p-5"><p className="text-sm font-semibold text-teal">{years}</p><h3 className="mt-1 font-heading text-xl font-semibold text-forest">{place}</h3><p className="mt-3 text-sm text-ink/70">{focus}</p></article>)}</div><p className="mt-5 text-sm text-ink/65">Learning alongside work: Diploma in Special Education (ASD), NIEPMD, 2016–2018.</p></div></div></section>;
}
