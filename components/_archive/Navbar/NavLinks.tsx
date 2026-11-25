"use client";
import Link from "next/link";
import { SITE_CONTENT, type NavLink } from "@/lib/content";

interface NavLinksProps {
  onClick?: () => void;
  className?: string;
  activeKey?: string;
}

export default function NavLinks({ onClick, className = "", activeKey }: NavLinksProps) {
  return (
    <>
      {SITE_CONTENT.nav.links.map((item: NavLink) => (
        <Link
          key={item.key}
          href={`/${item.href}`}
          onClick={onClick}
          aria-current={activeKey === item.key ? "location" : undefined}
          className={`nav-link ${activeKey === item.key ? "is-active" : ""} ${className}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
