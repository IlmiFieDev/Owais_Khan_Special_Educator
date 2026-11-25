import Link from "next/link";
import { SITE_CONTENT } from "@/lib/content";

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
}

export default function LegalPage({ eyebrow, title, updated, intro, sections }: LegalPageProps) {
  const renderParagraph = (paragraph: string) => {
    const email = SITE_CONTENT.contact.email;
    if (!paragraph.includes(email)) return paragraph;
    const [before, after] = paragraph.split(email);
    return <>{before}<a href={`mailto:${email}`} className="glow-interactive rounded px-1 font-semibold text-teal-dark underline underline-offset-2 break-all">{email}</a>{after}</>;
  };
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-teal/10 blur-3xl" aria-hidden="true" />
      <article className="relative mx-auto w-[min(860px,calc(100%-2rem))]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-dark">{eyebrow}</p>
        <h1 className="mt-3 font-heading text-[clamp(2.1rem,5vw,3.6rem)] font-semibold text-ink">{title}</h1>
        <p className="mt-2 text-sm text-ink-muted">Last updated: {updated}</p>
        {intro && <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-soft">{intro}</p>}
        <div className="prose-premium mt-8 space-y-8 text-ink-muted">
          {sections.map((section) => (
            <section key={section.title} className="glow-card rounded-soft border border-white/70 bg-frost/45 p-5 shadow-soft backdrop-blur sm:p-7">
              <h2 className="font-heading text-2xl font-semibold text-ink">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed">{renderParagraph(paragraph)}</p>
              ))}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
          <p>
            For questions or an educational conversation, please use the{" "}
            <Link href="/contact" className="glow-interactive rounded px-1 font-semibold text-teal-dark underline">Contact and Enquiry page</Link>.
          </p>
        </div>
      </article>
    </section>
  );
}
