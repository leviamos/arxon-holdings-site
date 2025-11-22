import { NextRequest, NextResponse } from "next/server";
import systemsData from "@/app/api/systems/store";

/**
 * Metrics Ingestion API
 *
 * POST /api/systems/:id/metrics
 *
 * Body example:
 * {
 *   "cpu": 0.12,
 *   "memory": 328,
 *   "latency": 42,
 *   "queue": 5
 * }
 */

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const system = systemsData.systems.find((s) => s.id === id);

    if (!system) {
      return NextResponse.json(
        { error: "Subsystem not found." },
        { status: 404 }
      );
    }

    // Metrics container
    system.metrics = {
      ...(system.metrics || {}),
      ...body,
      last_updated: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        metrics: system.metrics,
      },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to process metrics.",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
