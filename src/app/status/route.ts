import { NextResponse } from "next/server";

export async function GET() {
  // Local system heartbeat
  const serverTime = new Date().toISOString();

  return NextResponse.json(
    {
      status: "online",
      server_time: serverTime,
      environment: process.env.NODE_ENV,
      orchestrator: {
        url: "https://leviamos.app.n8n.cloud/webhook/agent-orchestrator",
        reachable: true // basic static flag (detailed check added in File 7)
      }
    },
    { status: 200 }
  );
}
