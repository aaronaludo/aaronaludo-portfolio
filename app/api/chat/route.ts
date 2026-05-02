import { NextResponse } from "next/server";
import { CHAT_AGENT_URL } from "./config";

type ChatSource = {
  source: string;
  chunk_index: number;
  distance?: number | null;
  text: string;
};

type ChatAgentResponse = {
  response: string;
  sources?: ChatSource[];
};

export async function POST(request: Request) {
  let message: string;

  try {
    const body = (await request.json()) as { message?: unknown };
    message = typeof body.message === "string" ? body.message.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  try {
    const response = await fetch(`${CHAT_AGENT_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        {
          error: "Chat agent request failed.",
          detail,
        },
        { status: response.status }
      );
    }

    const data = (await response.json()) as ChatAgentResponse;

    return NextResponse.json({
      response: data.response,
      sources: data.sources ?? [],
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Unable to reach the chat agent. Make sure the FastAPI service is running.",
      },
      { status: 503 }
    );
  }
}
