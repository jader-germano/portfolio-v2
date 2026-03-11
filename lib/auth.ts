import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { createSupabaseServerAuthClient, supabaseAdmin } from "@/lib/supabase";
import {
  DEFAULT_AUTHENTICATED_ROUTE,
  SESSION_TIMEOUT_SECONDS,
  normalizeAppRole,
  type AppRole,
} from "@/lib/auth-shared";

const normalizeNameFromEmail = (email?: string | null) => {
  if (!email) {
    return "JPG Labs Member";
  }

  return email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const resolveDisplayName = (name: unknown, email?: string | null) => {
  if (typeof name === "string" && name.trim().length > 0) {
    return name.trim();
  }

  return normalizeNameFromEmail(email);
};

const isConfiguredAuthEnvValue = (value?: string): value is string => {
  if (!value) {
    return false;
  }

  const normalized = value.trim();

  if (!normalized) {
    return false;
  }

  const blockedValues = [
    "placeholder",
    "your-google-client-id",
    "your-google-client-secret",
    "your-github-client-id",
    "your-github-client-secret",
    "local-google-client-id",
    "local-google-client-secret",
    "local-github-client-id",
    "local-github-client-secret",
  ];

  return !blockedValues.includes(normalized);
};

const getProfileRole = async ({
  userId,
  email,
}: {
  userId?: string | null;
  email?: string | null;
}): Promise<AppRole> => {
  const adminClient = supabaseAdmin();

  if (!adminClient) {
    return "user";
  }

  try {
    const query = adminClient.from("profiles").select("role");
    const response = userId
      ? await query.eq("id", userId).maybeSingle()
      : email
        ? await query.eq("email", email).maybeSingle()
        : null;

    const role = normalizeAppRole(response?.data?.role);
    return role ?? "user";
  } catch {
    return "user";
  }
};

const providers = [];

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (isConfiguredAuthEnvValue(githubClientId) && isConfiguredAuthEnvValue(githubClientSecret)) {
  providers.push(
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  );
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (isConfiguredAuthEnvValue(googleClientId) && isConfiguredAuthEnvValue(googleClientSecret)) {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  );
}

providers.push(
  CredentialsProvider({
    id: "credentials",
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.trim().toLowerCase();
      const password = credentials?.password;

      if (!email || !password) {
        return null;
      }

      const authClient = createSupabaseServerAuthClient();

      if (!authClient) {
        return null;
      }

      const { data, error } = await authClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        return null;
      }

      const role = await getProfileRole({
        userId: data.user.id,
        email: data.user.email ?? email,
      });

      return {
        id: data.user.id,
        email: data.user.email ?? email,
        name: resolveDisplayName(data.user.user_metadata?.full_name ?? data.user.user_metadata?.name, data.user.email),
        role,
        provider: "credentials",
      };
    },
  }),
);

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: SESSION_TIMEOUT_SECONDS,
  },
  jwt: {
    maxAge: SESSION_TIMEOUT_SECONDS,
  },
  providers,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        const userRole = "role" in user ? normalizeAppRole(user.role) : null;

        token.role =
          userRole ??
          (await getProfileRole({
            userId: token.sub,
            email: user.email,
          }));
        token.provider =
          account?.provider ?? ("provider" in user && typeof user.provider === "string" ? user.provider : "credentials");
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = normalizeAppRole(token.role) ?? "user";
        session.user.provider = typeof token.provider === "string" ? token.provider : "credentials";
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      if (url.startsWith(baseUrl)) {
        return url;
      }

      return `${baseUrl}${DEFAULT_AUTHENTICATED_ROUTE}`;
    },
  },
};
