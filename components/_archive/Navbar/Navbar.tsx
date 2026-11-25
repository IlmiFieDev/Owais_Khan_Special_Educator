"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AccessibilityPanel from "@/components/AccessibilityPanel/AccessibilityPanel";
import { SITE_CONTENT } from "@/lib/content";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveKey(visible.target.id);
      },
      { rootMargin: "-20% 0px -65%", threshold: [0, 0.15, 0.4] }
    );
    SITE_CONTENT.nav.links.forEach(({ key }) => {
      const section = document.getElementById(key);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusable?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.documentElement.classList.add("menu-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="container nav" aria-label="Main navigation">
        <Link href="/#home" className="brand" aria-label={`${SITE_CONTENT.personal.name} — home`}>
          <Image src="/brand/ok-mark.svg" width={50} height={40} alt="" priority />
          <span><b>{SITE_CONTENT.personal.name}</b><small>Special Educator</small></span>
        </Link>
        <div className="desktop-nav"><NavLinks activeKey={activeKey} /></div>
        <div className="nav-actions">
          <AccessibilityPanel />
          <Link href="/#contact" className="button button-primary nav-cta">Get in touch</Link>
          <button ref={triggerRef} className={`menu-toggle ${open ? "is-open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}><i /><i /><i /></button>
        </div>
      </nav>
      {open && <>
        <button className="menu-scrim" aria-label="Close menu" onClick={closeMenu} />
        <div ref={menuRef} id="mobile-menu" className="mobile-menu"><NavLinks activeKey={activeKey} onClick={closeMenu} /><Link href="/#contact" className="button button-primary" onClick={closeMenu}>Get in touch</Link></div>
      </>}
    </header>
  );
}
