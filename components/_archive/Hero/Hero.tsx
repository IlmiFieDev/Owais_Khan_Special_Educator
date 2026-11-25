import Image from "next/image";
import { SITE_CONTENT } from "@/lib/content";

function TrustIcon({ type }: { type: "experience" | "registration" | "location" }) {
  if (type === "experience") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 15 5l3.6.5.5 3.5 2.4 2.5-1.7 3.2.4 3.6-3.2 1.6L12 21l-3.1-1.8-3.2-1.6.4-3.6-1.7-3.2L6.9 9l.5-3.5L11 5l1-2Z"/><path d="m9.5 12 1.7 1.7 3.5-3.6"/></svg>;
  if (type === "registration") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 19v-1.2A4.8 4.8 0 0 1 8.3 13h1.4a4.8 4.8 0 0 1 4.8 4.8V19M16 9.5a2.5 2.5 0 1 0 0-5M16.5 13h.5a4 4 0 0 1 4 4v2"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5.2-8 11-8 11S4 15.2 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-rule">Special Educator · Delhi NCR</p>
          <h1 id="hero-heading">Supporting every learner to reach their <em>full potential.</em></h1>
          <p className="hero-lede">Individualised teaching, practical skill development and family collaboration for children with diverse learning needs.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contact">Get in touch <span aria-hidden="true">→</span></a><a className="button button-secondary" href="#expertise">Explore expertise</a></div>
        </div>
        <div className="hero-visual" aria-label="Inclusive learning and growth">
          <Image src="/brand/inclusive-learning-hero-v2.png" alt="An educator and learner sharing an inclusive learning activity" width={1450} height={1086} priority sizes="(max-width: 900px) 90vw, 48vw" />
        </div>
      </div>
      <div className="container trust-shell">
        <ul className="trust-row" aria-label="Professional highlights">
          <li><TrustIcon type="experience" /><span><b>15+ years</b><small>of experience</small></span></li>
          <li><TrustIcon type="registration" /><span><b>RCI Registered</b><small>{SITE_CONTENT.personal.crrNo}</small></span></li>
          <li><TrustIcon type="location" /><span><b>{SITE_CONTENT.personal.location}</b><small>Area of practice</small></span></li>
        </ul>
      </div>
    </section>
  );
}
