import { NextRequest, NextResponse } from "next/server";
import systemsData from "@/app/api/systems/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const system = systemsData.systems.find((s) => s.id === params.id);

  if (!system) {
    return NextResponse.json(
      { error: "Subsystem not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      system,
    },
    { status: 200 }
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const system = systemsData.systems.find((s) => s.id === params.id);

    if (!system) {
      return NextResponse.json(
        { error: "Subsystem not found." },
        { status: 404 }
      );
    }

    // Merge updates
    Object.assign(system, body);

    return NextResponse.json(
      {
        success: true,
        system,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to update subsystem.",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
