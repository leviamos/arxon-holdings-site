export async function POST(req) {
  try {
    const { message } = await req.json();

    // --- Security check ---
    const key = req.headers.get("x-arxon-key");
    if (key !== process.env.ARXON_AGENT_KEY) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- Call n8n webhook with basic auth ---
    const upstream = await fetch(process.env.N8N_AGENT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.N8N_AGENT_BASIC_USER}:${process.env.N8N_AGENT_BASIC_PASS}`
          ).toString("base64"),
      },
      body: JSON.stringify({ message }),
    });

    const text = await upstream.text();

    // Try to parse JSON; if it fails, return raw text
    let parsed = null;
    try {
      parsed = JSON.parse(text);
    } catch (_) {}

    return new Response(parsed ? JSON.stringify(parsed) : text, {
      status: upstream.status,
      headers: {
        "Content-Type": parsed ? "application/json" : "text/plain",
      },
    });
  } catch (error) {
    console.error("Agent API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return new Response("Arxon Agent API is running. Use POST with x-arxon-key.");
}
