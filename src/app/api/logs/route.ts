import { NextRequest, NextResponse } from "next/server";
import { arxonLog } from "@/lib/logger";
import { addToLogBuffer } from "@/app/api/logs/list/route";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { level, message, meta } = body;

    if (!level || !message) {
      return NextResponse.json(
        { error: "Missing 'level' or 'message' in request body." },
        { status: 400 }
      );
    }

    // Format entry with the shared logger
    const logEntry = arxonLog(level, message, meta);

    // Push into buffer for UI access
    addToLogBuffer(logEntry);

    return NextResponse.json(
      { success: true, entry: logEntry },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to process log entry.",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
