import { NextRequest, NextResponse } from "next/server";

//
// Temporary in-memory instruction buffer.
// Persists until server restarts.
//
let instructionBuffer: any[] = [];

export async function GET() {
  return NextResponse.json(
    {
      instructions: instructionBuffer,
      count: instructionBuffer.length,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { instruction, timestamp } = body;

    if (!instruction) {
      return NextResponse.json(
        { error: "Missing 'instruction' in request body." },
        { status: 400 }
      );
    }

    // Add to buffer (newest first)
    instructionBuffer.unshift({
      instruction,
      timestamp: timestamp || new Date().toISOString(),
    });

    // Limit to 200 entries
    if (instructionBuffer.length > 200) {
      instructionBuffer.pop();
    }

    return NextResponse.json(
      { success: true, stored: true },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to store instruction.",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
