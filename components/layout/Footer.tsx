import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_CONTENT } from "@/lib/content";

const exploreLinks = [
  { key: "about", label: "About Me", href: "/about" },
  { key: "expertise", label: "Areas of Expertise", href: "/expertise" },
  { key: "experience", label: "Professional Experience", href: "/experience" },
  { key: "qualifications", label: "Qualifications", href: "/qualifications" },
  { key: "approach", label: "My Teaching Approach", href: "/approach" },
];
const connectLinks = [
  { key: "resources", label: "Parent Resources", href: "/resources" },
  { key: "feedback", label: "Share Feedback", href: "/feedback" },
  { key: "contact", label: "Send an Enquiry", href: "/contact" },
];
const legalLinks = [
  { key: "privacy", label: "Privacy Policy", href: "/privacy" },
  { key: "terms", label: "Terms of Use", href: "/terms" },
  { key: "disclaimer", label: "Professional Disclaimer", href: "/disclaimer" },
  { key: "accessibility", label: "Accessibility Statement", href: "/accessibility" },
];

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="footer-link glow-interactive rounded-md px-1 py-0.5 text-sm text-sage/80 hover:text-frost">{children}</Link>;
}
function MailIcon() {
  return <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6.5h16v11H4z" stroke="currentColor" strokeWidth="1.7" /><path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function PinIcon() {
  return <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" /></svg>;
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(135deg,#102c3d_0%,#123f4c_52%,#087d75_140%)] text-sage/90">
      <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-teal/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto w-[min(1120px,calc(100%-2rem))] py-11 sm:py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.25fr_0.9fr_1fr] lg:gap-14">
          <div>
            <Link href="/" className="glow-interactive inline-flex items-center gap-3 rounded-xl pr-3 no-underline" aria-label={`${SITE_CONTENT.personal.name} — home`}>
              <Image src="/brand/ok-mark-white.svg" width={48} height={38} alt="" />
              <span><span className="block font-heading text-lg font-semibold text-frost">{SITE_CONTENT.personal.name}</span><span className="block text-xs tracking-wide text-sage/70">Special Educator</span></span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sage/75">{SITE_CONTENT.footer.tagline} Supporting learners and families with structure, compassion and clarity.</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-peach">{SITE_CONTENT.personal.location}, India</p>
            <p className="mt-1 text-xs font-semibold text-peach">{SITE_CONTENT.footer.rci}</p>
          </div>
          <nav aria-label="Explore footer navigation"><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-peach">Explore</h2><div className="mt-4 grid gap-2.5">{exploreLinks.map((link) => <FooterLink key={link.key} href={link.href}>{link.label}</FooterLink>)}</div></nav>
          <nav aria-label="Connect and resources footer navigation"><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-peach">Connect &amp; resources</h2><div className="mt-4 grid gap-2.5">{connectLinks.map((link) => <FooterLink key={link.key} href={link.href}>{link.label}</FooterLink>)}</div><div className="mt-5 grid gap-2 text-sm text-sage/80"><a href={`mailto:${SITE_CONTENT.contact.email}`} className="glow-interactive inline-flex max-w-full items-center gap-2 rounded-lg px-1 py-0.5 text-sage/90 hover:text-frost" aria-label={`Email ${SITE_CONTENT.personal.name}`}><MailIcon /><span className="break-all">{SITE_CONTENT.contact.email}</span></a><span className="inline-flex items-center gap-2 px-1"><PinIcon />Delhi NCR, India</span></div></nav>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-xs text-sage/60 sm:flex-row sm:items-center sm:justify-between"><p>{SITE_CONTENT.footer.copyright}</p><nav aria-label="Legal footer navigation" className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">{legalLinks.map((link) => <FooterLink key={link.key} href={link.href}>{link.label}</FooterLink>)}</nav></div>
      </div>
    </footer>
  );
}
