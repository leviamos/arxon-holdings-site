import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    "Arxon Agent API is running. Use POST with x-arxon-key.",
    {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    }
  );
}

export async function POST(request) {
  try {
    const { message } = await request.json().catch(() => ({}));

    // 1) Check caller key (only you / your UI should know this)
    const clientKey = request.headers.get("x-arxon-key");
    const expectedKey = process.env.ARXON_AGENT_KEY;

    if (!expectedKey || clientKey !== expectedKey) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Missing 'message' in request body" },
        { status: 400 }
      );
    }

    // 2) Validate n8n config
    const n8nUrl = process.env.N8N_AGENT_WEBHOOK_URL;
    const n8nUser = process.env.N8N_AGENT_BASIC_USER;
    const n8nPass = process.env.N8N_AGENT_BASIC_PASS;

    if (!n8nUrl || !n8nUser || !n8nPass) {
      return NextResponse.json(
        { error: "Agent backend not configured" },
        { status: 500 }
      );
    }

    // 3) Call n8n webhook with Basic Auth
    const basicAuth = Buffer.from(`${n8nUser}:${n8nPass}`).toString("base64");

    const upstream = await fetch(n8nUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        message,
        source: "arxon-site",
      }),
    });

    const raw = await upstream.text();

    // Try to parse JSON response from n8n/OpenAI; fall back to text
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }

    return new NextResponse(
      parsed ? JSON.stringify(parsed) : raw,
      {
        status: upstream.status || 200,
        headers: {
          "Content-Type": parsed ? "application/json" : "text/plain",
        },
      }
    );
  } catch (err) {
    console.error("Arxon Agent API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
