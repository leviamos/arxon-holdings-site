export async function POST(req) {
  const { message } = await req.json().catch(() => ({}));

  return new Response(
    JSON.stringify({
      ok: true,
      method: "POST",
      received: message || null,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function GET() {
  return new Response(
    "Arxon Agent API is running. Use POST with x-arxon-key.",
    {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    }
  );
}
