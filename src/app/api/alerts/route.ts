import { NextRequest, NextResponse } from "next/server";
import alertStore from "@/app/api/alerts/alertStore";

/**
 * Alerts API
 *
 * GET /api/alerts       -> returns all alerts
 * DELETE /api/alerts    -> clears all alerts (admin)
 */

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        alerts: alertStore.getAlerts()
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to fetch alerts"
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    alertStore.clear();

    return NextResponse.json(
      { success: true, message: "All alerts cleared." },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to clear alerts"
      },
      { status: 500 }
    );
  }
}
