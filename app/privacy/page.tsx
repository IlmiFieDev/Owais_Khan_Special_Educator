import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacySections } from "@/lib/legalContent";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy policy for this website.", alternates: { canonical: "/privacy" } };
export default function PrivacyPage() {
  return <LegalPage eyebrow="Privacy" title="Privacy Policy" updated="25 November 2026" sections={privacySections} />;
}
