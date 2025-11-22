import { NextRequest, NextResponse } from "next/server";
import alertStore from "@/app/api/alerts/alertStore";

/**
 * POST /api/alerts/:id/ack
 * Acknowledges a specific alert.
 */

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const success = alertStore.acknowledgeAlert(params.id);

  if (!success) {
    return NextResponse.json(
      { success: false, error: "Alert not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Alert acknowledged." },
    { status: 200 }
  );
}
