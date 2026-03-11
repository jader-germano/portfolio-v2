import type { Metadata } from "next";
import PrivacyPageClient from "@/components/PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy | JPG Labs",
  description: "Privacy policy for JPG Labs authentication, session handling, and protected workspace access.",
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
