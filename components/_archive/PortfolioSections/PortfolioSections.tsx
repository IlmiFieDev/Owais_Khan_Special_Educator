"use client";

import { useState } from "react";
import { SITE_CONTENT } from "@/lib/content";

const roles = [
  ["Present", "Enable 361", "Special Educator — role details to be confirmed."],
  ["2016–2018", "The Manthan School", "Individual and group sessions with therapist and parent collaboration."],
  ["2014–2016", "Rhythm Play School", "Early intervention, teaching aids and inclusion."],
  ["2013–2014", "FSMHP Udaan (J.R.C.)", "Intellectual Disability, IEP delivery and documentation."],
  ["2012", "Shaura Centre", "Remedial literacy and numeracy interventions."],
  ["2009–2012", "Tamana Special School", "Autism, Down syndrome and inclusion programmes."],
] as const;

const alongside = [
  ["After 2018–present", "Independent practice, Delhi NCR", "One-to-one, session-based tuitions."],
  ["2014–2018", "Adhaar Clinic, Noida", "Assessments, parent training, and speech and OT collaboration."],
] as const;

const faqs = [
  ["How long is a session?", "Session length is discussed during consultation so it fits your child’s needs."],
  ["Where are sessions offered?", "Online, home visits and centre options will be confirmed during consultation."],
  ["How is progress shared?", "Progress is reviewed together through clear, practical updates."],
] as const;

function LineIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "autism") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M5 19c3-8 7-8 11 0 4 8 8 8 11 0M5 13c3 8 7 8 11 0 4-8 8-8 11 0"/></svg>;
  if (name === "down") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="16" cy="16" r="10"/><path d="M16 3v3M16 26v3M3 16h3M26 16h3M7 7l2 2M23 23l2 2M25 7l-2 2M9 23l-2 2"/><path d="M11.5 15.5c1.5-2 3.2-.7 4.5 1.2 1.3-1.9 3-3.2 4.5-1.2 1.6 2.2-1.4 4.6-4.5 6.6-3.1-2-6.1-4.4-4.5-6.6Z"/></svg>;
  if (name === "intellectual") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M10 6h8a7 7 0 0 1 7 7v3a5 5 0 0 1-5 5h-2l-5 5v-5h-3a7 7 0 0 1 0-15Z"/><path d="M11 13h10M11 17h6"/></svg>;
  if (name === "learning") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M4 7c5-1 9 0 12 3v16c-3-3-7-4-12-3V7ZM28 7c-5-1-9 0-12 3v16c3-3 7-4 12-3V7Z"/></svg>;
  if (name === "early") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M16 28V14M16 18c-6 0-10-3-10-9 6 0 10 3 10 9ZM16 14c0-6 4-9 10-9 0 6-4 9-10 9Z"/></svg>;
  if (name === "understand") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="14" cy="14" r="8"/><path d="m20 20 7 7M10 14l2.5 2.5L18 11"/></svg>;
  if (name === "plan") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="6"/><circle cx="16" cy="16" r="1.5"/><path d="m20 12 7-7M22 5h5v5"/></svg>;
  if (name === "teach") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M7 8h18v18H7zM11 5h10v6H11zM11 16h10M11 20h7"/></svg>;
  if (name === "review") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M6 26V7M6 26h21"/><path d="m10 21 5-6 4 3 7-9"/><circle cx="10" cy="21" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="19" cy="18" r="1"/><circle cx="26" cy="9" r="1"/></svg>;
  if (name === "involve") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="11" cy="11" r="4"/><circle cx="22" cy="12" r="3"/><path d="M4 27v-3a7 7 0 0 1 14 0v3M18 27v-2a5 5 0 0 1 10 0v2"/></svg>;
  if (name === "family") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="11" cy="11" r="4"/><circle cx="22" cy="12" r="3"/><path d="M4 27v-3a7 7 0 0 1 14 0v3M18 27v-2a5 5 0 0 1 10 0v2"/></svg>;
  if (name === "target") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="6"/><circle cx="16" cy="16" r="1.5"/><path d="m20 12 7-7"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M16 28V14M16 18c-6 0-10-3-10-9 6 0 10 3 10 9ZM16 14c0-6 4-9 10-9 0 6-4 9-10 9Z"/></svg>;
}

const expertiseIcons = ["autism", "down", "intellectual", "learning", "early"];
const approachIcons = ["understand", "plan", "teach", "review", "involve"];

export default function PortfolioSections() {
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [allExperience, setAllExperience] = useState(false);
  const [allCredentials, setAllCredentials] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const current = SITE_CONTENT.whoIWorkWith.cards[activeExpertise];
  const visibleRoles = allExperience ? roles : roles.slice(0, 3);
  const visibleCredentials = allCredentials ? SITE_CONTENT.credentials.cards : SITE_CONTENT.credentials.cards.slice(0, 2);

  return <>
    <section id="about" className="section about-section" aria-labelledby="about-heading">
      <div className="container about-grid">
        <div className="about-heading"><p className="eyebrow eyebrow-rule">About Owais</p><h2 id="about-heading">Practical, individualised support for meaningful progress.</h2></div>
        <div className="about-copy"><p>Owais Alam Khan is a Special Educator based in Delhi NCR, supporting learners and families through structured, responsive teaching. His work brings together individual planning, practical skill development and close family collaboration.</p><ul className="fact-list"><li><span className="mini-icon coral"><LineIcon name="target" /></span><b>Individualised education planning</b></li><li><span className="mini-icon blue"><LineIcon name="family" /></span><b>Family-centred guidance</b></li><li><span className="mini-icon green"><LineIcon name="leaf" /></span><b>Learner-focused support</b></li></ul></div>
      </div>
    </section>

    <section id="expertise" className="section expertise-section" aria-labelledby="expertise-heading">
      <div className="container"><div className="section-intro split-intro"><div><p className="eyebrow eyebrow-rule">Expertise</p><h2 id="expertise-heading">Support shaped around each learner.</h2></div><p>Five established areas of practice, brought together through structured teaching and practical skill development.</p></div>
        <div className="expertise-cards">{SITE_CONTENT.whoIWorkWith.cards.map((item, index) => <button key={item.id} aria-expanded={activeExpertise === index} aria-controls="expertise-detail" className={`expertise-card tone-${index + 1} ${activeExpertise === index ? "is-active" : ""}`} onClick={() => setActiveExpertise(index)}><span className="expertise-icon"><LineIcon name={expertiseIcons[index]} /></span><b>{item.title}</b><small>{item.focusAreas[0]}</small><i aria-hidden="true">{activeExpertise === index ? "−" : "+"}</i></button>)}</div>
        <article className="expertise-detail" id="expertise-detail" aria-live="polite"><div><p className="eyebrow">Selected focus</p><h3>{current.title}</h3><p>{current.shortDescription}</p></div><ul>{current.focusAreas.map((area) => <li key={area}><span aria-hidden="true">✓</span>{area}</li>)}</ul></article>
        <details className="disclosure methods"><summary>Methods &amp; skills <span>Explore all nine areas <i aria-hidden="true">↓</i></span></summary><div className="methods-grid">{SITE_CONTENT.skills.items.map((skill, index) => <article key={skill.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{skill.name}</h3><p>{skill.explanation}</p></article>)}</div></details>
      </div>
    </section>

    <section id="experience" className="section experience-section" aria-labelledby="experience-heading"><div className="container"><div className="section-intro split-intro"><div><p className="eyebrow eyebrow-rule">Experience &amp; qualifications</p><h2 id="experience-heading">A career grounded in education and collaboration.</h2></div><p>Professional experience across schools, clinics and independent practice in Delhi NCR.</p></div><div className="experience-grid"><div className="experience-column"><ol className="timeline">{visibleRoles.map(([years, place, focus], index) => <li key={place} className={index === 0 ? "is-current" : ""}><p>{years}</p><h3>{place}</h3><span>Special Educator</span><small>{focus}</small></li>)}</ol><button className="text-button" onClick={() => setAllExperience(!allExperience)} aria-expanded={allExperience}>{allExperience ? "Show less experience ↑" : "View full career journey →"}</button><div className="alongside">{alongside.map(([years, place, focus]) => <article key={place}><p>{years}</p><h3>{place}</h3><span>{focus}</span></article>)}</div></div>
      <aside className="qualifications"><div className="qualifications-heading"><span className="qualification-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="m3 11 13-6 13 6-13 6-13-6Zm5 4v7c5 4 11 4 16 0v-7M29 11v10"/></svg></span><div><p className="eyebrow">Qualifications</p><h3>Education &amp; credentials</h3></div></div>{visibleCredentials.map((credential) => <article key={credential.title}><span className="check" aria-hidden="true">✓</span><div><p>{credential.year}</p><h3>{credential.title}</h3><span>{credential.institution}</span>{credential.description && <small>{credential.description}</small>}</div></article>)}<button className="text-button" onClick={() => setAllCredentials(!allCredentials)} aria-expanded={allCredentials}>{allCredentials ? "Show fewer qualifications ↑" : "View all qualifications →"}</button><p className="additional">{SITE_CONTENT.credentials.additionalSkills}</p></aside></div></div></section>

    <section id="approach" className="section approach-section" aria-labelledby="approach-heading"><div className="container"><div className="approach-layout"><div className="approach-intro"><p className="eyebrow eyebrow-rule">Approach</p><h2 id="approach-heading">A clear, collaborative process.</h2><p>Every learner is unique. The process stays structured, responsive and family-aware.</p></div><ol className="approach-steps">{SITE_CONTENT.approach.steps.map((step, index) => <li key={step.step} className={activeStep === index ? "is-active" : ""}><button onClick={() => setActiveStep(index)} aria-expanded={activeStep === index} aria-controls="approach-detail"><span className="process-icon"><LineIcon name={approachIcons[index]} /></span><strong>{step.title}</strong><small>{step.subtitle}</small></button>{index < SITE_CONTENT.approach.steps.length - 1 && <i className="process-arrow" aria-hidden="true">→</i>}</li>)}</ol></div><div id="approach-detail" className="approach-detail" aria-live="polite"><span>{String(SITE_CONTENT.approach.steps[activeStep].step).padStart(2, "0")}</span><p>{SITE_CONTENT.approach.steps[activeStep].description}</p></div></div></section>

    <section className="section closing-section" aria-label="Parent guidance and contact"><div className="container closing-grid"><div className="faq-panel"><p className="eyebrow eyebrow-rule">Parent guidance</p><h2>Questions parents often ask.</h2><div className="faq-list">{faqs.map(([question, answer]) => <details key={question} className="faq"><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div><div id="contact" className="contact-panel" aria-labelledby="contact-heading"><div className="contact-copy"><p className="eyebrow eyebrow-rule">Get in touch</p><h2 id="contact-heading">Start with a conversation.</h2><p>Based in Delhi NCR. Contact details and online enquiries will be published once the client’s preferred channel is confirmed.</p></div><form className="contact-form" aria-describedby="form-status"><fieldset disabled><div className="form-grid"><label>Name<input name="name" autoComplete="name" /></label><label>Email or phone<input name="contact" autoComplete="email" /></label><label className="message-field">Short message<textarea name="message" rows={3} /></label></div><label className="consent"><input type="checkbox" /> I agree to be contacted about this enquiry.</label><button type="submit">Online enquiries unavailable</button></fieldset><p id="form-status" role="status">A secure contact channel has not yet been configured. This form does not send or store information.</p></form><p className="contact-note">Please do not include a child’s full name, diagnosis or other sensitive details in an initial enquiry.</p></div></div></section>
  </>;
}
