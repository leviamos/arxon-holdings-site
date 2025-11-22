import { NextResponse } from "next/server";

//
// Temporary in-memory systems list.
// Will later be made dynamic and orchestrator-driven.
//
let systems: any[] = [
  {
    id: "core-agent",
    name: "Core Agent System",
    status: "online",
    description: "Primary reasoning and instruction execution layer.",
  },
  {
    id: "orchestrator",
    name: "Workflow Orchestrator",
    status: "online",
    description: "Handles multi-step processing and agent pipelines.",
  },
];

export async function GET() {
  return NextResponse.json(
    {
      systems,
      count: systems.length,
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.id || !body.name) {
      return NextResponse.json(
        { error: "Missing 'id' or 'name' in system registration." },
        { status: 400 }
      );
    }

    // Add only if not already present
    if (!systems.find((s) => s.id === body.id)) {
      systems.push({
        id: body.id,
        name: body.name,
        status: body.status || "unknown",
        description: body.description || "",
      });
    }

    return NextResponse.json(
      { success: true, systems },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to register system.",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
