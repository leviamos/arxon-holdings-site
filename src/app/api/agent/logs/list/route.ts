import { NextResponse } from "next/server";

//
// Temporary in-memory log store.
// Will reset on server restart until replaced by a DB layer.
//
let logBuffer: any[] = [];

export function addToLogBuffer(entry: any) {
  // max 500 entries retained
  logBuffer.unshift(entry);
  if (logBuffer.length > 500) {
    logBuffer.pop();
  }
}

export async function GET() {
  return NextResponse.json(
    {
      logs: logBuffer,
      count: logBuffer.length,
    },
    { status: 200 }
  );
}
