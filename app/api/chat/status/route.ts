import { NextResponse } from "next/server";
import { CHAT_AGENT_URL } from "../config";

export async function GET() {
  try {
    const response = await fetch(`${CHAT_AGENT_URL}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });

    if (!response.ok) {
      return NextResponse.json({ status: "offline" }, { status: 503 });
    }

    return NextResponse.json({ status: "online" });
  } catch {
    return NextResponse.json({ status: "offline" }, { status: 503 });
  }
}
