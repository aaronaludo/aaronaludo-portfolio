import { NextResponse } from "next/server";
import { CHAT_AGENT_ENDPOINT } from "./config";

type ChatSource = {
  source: string;
  chunk_index: number;
  distance?: number | null;
  text: string;
};

type ChatAgentResponse = {
  response: string;
  sources?: ChatSource[];
  mode?: "casual" | "rag" | "blocked" | "direct" | "hybrid";
};

type ChatHistoryMessage = {
  role: "assistant" | "user";
  content: string;
};

const resolveChatMode = (data: ChatAgentResponse) =>
  data.mode ?? ((data.sources?.length ?? 0) > 0 ? "rag" : "casual");

const getResponseText = (data: unknown): string | null => {
  if (typeof data === "string") {
    return data.trim() || null;
  }

  if (Array.isArray(data)) {
    return data.map(getResponseText).find((value): value is string => Boolean(value)) ?? null;
  }

  if (typeof data !== "object" || data === null) {
    return null;
  }

  const record = data as Record<string, unknown>;
  const text =
    record.response ?? record.output ?? record.answer ?? record.text ?? record.message;

  return typeof text === "string" && text.trim() ? text.trim() : null;
};

const normalizeChatAgentResponse = (data: unknown): ChatAgentResponse => {
  const response = getResponseText(data);

  if (!response) {
    throw new Error("Chat agent response did not include a message.");
  }

  const record =
    typeof data === "object" && data !== null && !Array.isArray(data)
      ? (data as Partial<ChatAgentResponse>)
      : {};

  return {
    response,
    sources: Array.isArray(record.sources) ? record.sources : [],
    mode: record.mode,
  };
};

const readChatAgentResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

export async function POST(request: Request) {
  let message: string;
  let history: ChatHistoryMessage[] = [];

  try {
    const body = (await request.json()) as { message?: unknown; history?: unknown };
    message = typeof body.message === "string" ? body.message.trim() : "";
    history = Array.isArray(body.history)
      ? body.history
          .map((item): ChatHistoryMessage | null => {
            if (
              typeof item === "object" &&
              item !== null &&
              "role" in item &&
              "content" in item
            ) {
              const role = item.role;
              const content = item.content;
              if (
                (role === "assistant" || role === "user") &&
                typeof content === "string" &&
                content.trim()
              ) {
                return { role, content: content.trim() };
              }
            }

            return null;
          })
          .filter((item): item is ChatHistoryMessage => item !== null)
          .slice(-12)
      : [];
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  try {
    const response = await fetch(CHAT_AGENT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        chatInput: message,
        history,
      }),
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

    const data = normalizeChatAgentResponse(await readChatAgentResponse(response));

    return NextResponse.json({
      response: data.response,
      sources: data.sources ?? [],
      mode: resolveChatMode(data),
    });
  } catch {
    return NextResponse.json(
      {
        error: "Aaron Aludo is not available right now. Please try again shortly.",
      },
      { status: 503 }
    );
  }
}
