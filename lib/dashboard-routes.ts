export type DashboardRouteInventoryItem = {
  label: string;
  path: string;
  access: string;
  description: string;
  sourceFile: string;
  sourcePath: string;
  note?: string;
};

export const DASHBOARD_ROUTE_INVENTORY: DashboardRouteInventoryItem[] = [
  {
    label: "Public Home",
    path: "/",
    access: "Public",
    description: "Open portfolio surface with the showcase and protected-route entry points.",
    sourceFile: "app/page.tsx",
    sourcePath: "app/page.tsx",
  },
  {
    label: "Login",
    path: "/login",
    access: "Public",
    description: "SSO and credentials gateway with the protected-session timeout policy.",
    sourceFile: "app/login/page.tsx",
    sourcePath: "app/login/page.tsx",
  },
  {
    label: "Terms of Service",
    path: "/terms",
    access: "Public",
    description: "Legal terms for authenticated access and restricted technical material.",
    sourceFile: "components/TermsPageClient.tsx",
    sourcePath: "components/TermsPageClient.tsx",
  },
  {
    label: "Privacy Policy",
    path: "/privacy",
    access: "Public",
    description: "Privacy and retention commitments for session, identity and protected assets.",
    sourceFile: "components/PrivacyPageClient.tsx",
    sourcePath: "components/PrivacyPageClient.tsx",
  },
  {
    label: "Instances Dashboard",
    path: "/dashboard/instances",
    access: "Authenticated",
    description: "Owner dashboard for live Pi, VPS and runtime topology visibility.",
    sourceFile: "app/dashboard/instances/page.tsx",
    sourcePath: "app/dashboard/instances/page.tsx",
    note: "Primary operator landing route after sign-in.",
  },
  {
    label: "Guardian Console",
    path: "/dashboard/guardian",
    access: "Authenticated",
    description: "Integrity, malware and edge checks backed by the Pi guardian snapshot.",
    sourceFile: "app/dashboard/guardian/page.tsx",
    sourcePath: "app/dashboard/guardian/page.tsx",
  },
  {
    label: "Dashboard Runtime API",
    path: "/api/dashboard/runtime",
    access: "Authenticated API",
    description: "Private proxy that consolidates local/public Pi runtime state for the dashboard.",
    sourceFile: "app/api/dashboard/runtime/route.ts",
    sourcePath: "app/api/dashboard/runtime/route.ts",
  },
  {
    label: "Resume Parse API",
    path: "/api/resume/parse",
    access: "Authenticated API",
    description: "Resume upload parsing contract backed by the current Ollama integration lane.",
    sourceFile: "app/api/resume/parse/route.ts",
    sourcePath: "app/api/resume/parse/route.ts",
  },
  {
    label: "Health Probe",
    path: "/api/health",
    access: "Private Service Probe",
    description: "Readiness and liveness endpoint used by the backend/BFF deployment lane.",
    sourceFile: "app/api/health/route.ts",
    sourcePath: "app/api/health/route.ts",
  },
];
