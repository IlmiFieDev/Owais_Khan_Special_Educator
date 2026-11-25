import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { disclaimerSections } from "@/lib/legalContent";

export const metadata: Metadata = { title: "Professional Disclaimer", description: "Professional disclaimer for this website.", alternates: { canonical: "/disclaimer" } };
export default function DisclaimerPage() {
  return <LegalPage eyebrow="Legal" title="Professional Disclaimer" updated="25 November 2026" sections={disclaimerSections} />;
}
