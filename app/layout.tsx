import type { Metadata } from "next";
import localFont from "next/font/local";
import { LanguageProvider } from "@/components/LanguageProvider";
import SessionProviders from "@/components/SessionProviders";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jader Germano — Senior Full-Stack Engineer",
  description: "Senior Full-Stack Software Engineer specializing in Java 21, Spring Boot 3, Angular 20, and AI Orchestration. Founder of JPG Labs.",
  keywords: ["Java", "Spring Boot", "Angular", "TypeScript", "React", "DevOps", "AI", "JPG Labs"],
  authors: [{ name: "Jader Philipe Germano" }],
  openGraph: {
    title: "Jader Germano — Senior Full-Stack Engineer",
    description: "10+ years building enterprise-grade systems. Java 21 · Spring Boot 3 · Angular 20 · Node.js · AI Orchestration",
    url: "https://jpglabs.com.br",
    siteName: "JPG Labs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={geistSans.className}>
        <LanguageProvider>
          <SessionProviders>{children}</SessionProviders>
        </LanguageProvider>
      </body>
    </html>
  );
}
