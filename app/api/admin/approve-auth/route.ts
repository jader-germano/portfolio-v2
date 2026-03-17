import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import crypto from "crypto";

/**
 * POST /api/admin/approve-auth
 * Approves a pending auth request and generates a 1-day temporary key.
 * Strictly gated to PRIME_OWNER.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Verify PRIME_OWNER role
    if (!session || session.user.role !== "PRIME_OWNER") {
      return NextResponse.json({ error: "Unauthorized. PRIME_OWNER required." }, { status: 403 });
    }

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // 2. Generate temporary key (1-day validity)
    const tempKey = crypto.randomBytes(32).toString("hex");
    const tempKeyHash = crypto.createHash("sha256").update(tempKey).digest("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // +24 hours

    const adminClient = supabaseAdmin();
    if (!adminClient) {
      return NextResponse.json({ error: "Database configuration error." }, { status: 500 });
    }

    // 3. Update auth_requests table
    const { error } = await adminClient
      .from("auth_requests")
      .update({
        status: "APPROVED",
        temp_auth_key_hash: tempKeyHash,
        key_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("email", email.toLowerCase());

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4. Return the key (to be sent via email in the next automation step)
    return NextResponse.json({
      success: true,
      message: `Request for ${email} approved.`,
      temp_key: tempKey,
      expires_at: expiresAt.toISOString(),
    });
  } catch (err) {
    console.error("Approval API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
