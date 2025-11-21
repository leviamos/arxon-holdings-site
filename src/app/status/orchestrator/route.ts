import { NextResponse } from "next/server";

export async function GET() {
  const orchestratorUrl =
    "https://leviamos.app.n8n.cloud/webhook/agent-orchestrator";

  let reachable = false;
  let latency = null;

  try {
    const start = Date.now();

    const res = await fetch(orchestratorUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // Send a minimal ping payload
      body: JSON.stringify({ ping: true })
    });

    const end = Date.now();
    latency = end - start;
    reachable = res.ok;
  } catch (err) {
    reachable = false;
  }

  return NextResponse.json(
    {
      orchestrator_url: orchestratorUrl,
      reachable,
      latency_ms: latency
    },
    { status: 200 }
  );
}
