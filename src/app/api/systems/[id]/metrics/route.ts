import { NextRequest, NextResponse } from "next/server";
import systemsData from "@/app/api/systems/store";
import metricsStore from "@/app/api/systems/metricsStore";

/**
 * Metrics Ingestion API (Upgraded for History)
 *
 * POST /api/systems/:id/metrics
 *
 * Stores both latest metrics & historical metrics.
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

    // Update latest metrics on subsystem
    system.metrics = {
      ...(system.metrics || {}),
      ...body,
      last_updated: new Date().toISOString(),
    };

    // Push into historical store
    metricsStore.addMetric(id, system.metrics);

    return NextResponse.json(
      {
        success: true,
        latest: system.metrics,
        history_length: metricsStore.getMetrics(id).length,
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
