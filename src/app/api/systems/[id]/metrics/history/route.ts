import { NextRequest, NextResponse } from "next/server";
import metricsStore from "@/app/api/systems/metricsStore";

/**
 * GET /api/systems/:id/metrics/history
 *
 * Returns the full historical metrics buffer for the subsystem.
 */

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const history = metricsStore.getMetrics(id);

    return NextResponse.json(
      {
        success: true,
        id,
        count: history.length,
        history,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch metrics history",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
