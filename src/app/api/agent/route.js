export async function POST(req) {
  try {
    const { message } = await req.json();

    // --- Security check ---
    const key = req.headers.get("x-arxon-key");
    if (key !== process.env.ARXON_AGENT_KEY) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // --- Send request to n8n webhook ---
    const response = await fetch(process.env.N8N_AGENT_WEBHOOK_URL, {
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

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Agent API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET() {
  return new Response("Arxon Agent API is running. Use POST with x-arxon-key.");
}
