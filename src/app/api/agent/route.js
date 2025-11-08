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
  const { message } = await request.json().catch(() => ({}));

  return NextResponse.json(
    {
      ok: true,
      method: "POST",
      received: message ?? null,
    },
    { status: 200 }
  );
}
