import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // --- Access Control ---
  const accessKey = req.headers.get("arxon-access-key");
  if (!accessKey || accessKey !== "Arxon_owner_281083") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    // Relay to Orchestrator (n8n)
    const orchestrator = await fetch(
      "https://leviamos.app.n8n.cloud/webhook/agent-orchestrator",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      }
    );

    const data = await orchestrator.json();

    return NextResponse.json(
      { success: true, orchestrator_response: data },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: err?.message },
      { status: 500 }
    );
  }
}
