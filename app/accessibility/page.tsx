import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { accessibilitySections } from "@/lib/legalContent";

export const metadata: Metadata = { title: "Accessibility Statement", description: "Accessibility commitment and assistance information.", alternates: { canonical: "/accessibility" } };
export default function AccessibilityPage() {
  return <LegalPage eyebrow="Accessibility" title="Accessibility Statement" updated="25 November 2026" sections={accessibilitySections} />;
}
