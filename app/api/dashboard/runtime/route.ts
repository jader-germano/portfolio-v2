import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { loadPiDashboardSnapshot } from "@/lib/pi-runtime";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await loadPiDashboardSnapshot();
    return NextResponse.json(snapshot, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown runtime failure";
    return NextResponse.json(
      {
        error: "runtime_unavailable",
        detail,
      },
      { status: 503 },
    );
  }
}
