import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin, createSupabaseServerAuthClient } from "@/lib/supabase";

export async function GET() {
  try {
    const client = createSupabaseServerAuthClient() || supabaseAdmin();
    if (!client) {
      return NextResponse.json({ error: "Database configuration error." }, { status: 500 });
    }

    const { data, error } = await client
      .from("portfolio_skills")
      .select("*")
      .order("category", { ascending: true })
      .order("order_index", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET Skills Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;

    if (!role || (role !== "PRIME_OWNER" && role !== "PI_AGENT_OS")) {
      return NextResponse.json({ error: "Unauthorized. Requires PRIME_OWNER or PI_AGENT_OS." }, { status: 403 });
    }

    const adminClient = supabaseAdmin();
    if (!adminClient) {
      return NextResponse.json({ error: "Database configuration error." }, { status: 500 });
    }

    const body = await req.json();
    const { data, error } = await adminClient.from("portfolio_skills").insert(body).select().single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("POST Skills Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
