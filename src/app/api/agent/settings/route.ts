import { NextRequest, NextResponse } from "next/server";

//
// Temporary in-memory agent settings.
// Will be replaced with persistent storage in a later file.
//
let agentSettings: any = {
  autonomy_enabled: false,
  temperature: 0.7,
  max_tokens: 4096,
  system_prompt: "You are Arxon Intelligence, a highly capable autonomous agent.",
};

export async function GET() {
  return NextResponse.json(
    { settings: agentSettings },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Merge incoming updates
    agentSettings = {
      ...agentSettings,
      ...body,
    };

    return NextResponse.json(
      { success: true, settings: agentSettings },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to update agent settings.",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
