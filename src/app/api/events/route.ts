import { NextRequest, NextResponse } from "next/server";
import eventStore from "@/app/api/events/eventStore";

/**
 * Global Event Logging API
 *
 * POST /api/events
 *
 * Body:
 * {
 *   "type": "subsystem-offline",
 *   "message": "Core subsystem went offline",
 *   "details": { ... }
 * }
 *
 * GET /api/events
 * Returns the full event log.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.type || !body.message) {
      return NextResponse.json(
        { error: "Missing 'type' or 'message' field." },
        { status: 400 }
      );
    }

    eventStore.addEvent(body.type, body.message, body.details);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to log event",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      events: eventStore.getEvents(),
    },
    { status: 200 }
  );
}
