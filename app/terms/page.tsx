import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsSections } from "@/lib/legalContent";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms governing use of this website.", alternates: { canonical: "/terms" } };
export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Terms of Use" updated="25 November 2026" sections={termsSections} />;
}
