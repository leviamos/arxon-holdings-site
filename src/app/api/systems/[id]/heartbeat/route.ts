import { NextRequest, NextResponse } from "next/server";
import systemsData from "@/app/api/systems/store";

/**
 * Heartbeat endpoint for subsystems.
 * 
 * POST /api/systems/:id/heartbeat
 * 
 * Body can include any metadata:
 * {
 *   latency: 42,
 *   node: "n8n-main",
 *   workload: 0.12
 * }
 */

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json().catch(() => ({}));

    const system = systemsData.systems.find((s) => s.id === id);

    if (!system) {
      return NextResponse.json(
        { error: "Subsystem not found." },
        { status: 404 }
      );
    }

    // Update subsystem
    system.status = "online";
    system.last_heartbeat = new Date().toISOString();

    // Merge metadata into subsystem record
    if (body && typeof body === "object") {
      system.metadata = {
        ...(system.metadata || {}),
        ...body,
      };
    }

    return NextResponse.json(
      {
        success: true,
        system,
      },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to process heartbeat.",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
