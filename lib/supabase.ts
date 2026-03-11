import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const serverAuthOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

export const hasSupabasePublicConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const createSupabaseBrowserClient = () =>
  hasSupabasePublicConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const createSupabaseServerAuthClient = () =>
  hasSupabasePublicConfig ? createClient(supabaseUrl, supabaseAnonKey, serverAuthOptions) : null;

export const supabase = createSupabaseBrowserClient();

export const supabaseAdmin = () =>
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, serverAuthOptions)
    : null;
