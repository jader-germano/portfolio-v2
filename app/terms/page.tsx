import type { Metadata } from "next";
import TermsPageClient from "@/components/TermsPageClient";

export const metadata: Metadata = {
  title: "Terms of Service | JPG Labs",
  description: "Operational terms for authenticated access to the JPG Labs private workspace.",
};

export default function TermsPage() {
  return <TermsPageClient />;
}
