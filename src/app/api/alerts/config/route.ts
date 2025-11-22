import { NextRequest, NextResponse } from "next/server";
import { configureAlertDispatch } from "@/lib/alertDispatcher";

let currentConfig: any = {
  slackWebhookUrl: null,
  emailWebhookUrl: null,
  smsWebhookUrl: null,
  genericWebhookUrl: null,
};

/**
 * GET  /api/alerts/config
 *      -> returns current alert configuration
 *
 * POST /api/alerts/config
 *      BODY: { slackWebhookUrl?: string, emailWebhookUrl?: string, ... }
 *
 * Allows runtime configuration of alert destinations.
 */

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      config: currentConfig,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Merge partial updates
    currentConfig = {
      ...currentConfig,
      ...body,
    };

    // Apply new config to dispatcher
    configureAlertDispatch(currentConfig);

    return NextResponse.json(
      {
        success: true,
        message: "Alert configuration updated.",
        config: currentConfig,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to update alert config",
      },
      { status: 500 }
    );
  }
}
