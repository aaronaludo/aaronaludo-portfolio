"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { HiOutlineChatBubbleLeftRight, HiOutlinePaperAirplane, HiOutlineXMark } from "react-icons/hi2";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type ConnectionStatus = "checking" | "online" | "offline";

const starterPrompts = [
  "What projects has Aaron built?",
  "What is Aaron's tech stack?",
  "How can I contact Aaron?",
];

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hi, I can answer questions about Aaron's work, projects, skills, and contact details.",
  },
];

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("checking");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const checkConnection = async () => {
    try {
      const response = await fetch("/api/chat/status", {
        cache: "no-store",
      });
      const data = (await response.json()) as { status?: ConnectionStatus };

      setConnectionStatus(response.ok && data.status === "online" ? "online" : "offline");
    } catch {
      setConnectionStatus("offline");
    }
  };

  useEffect(() => {
    void checkConnection();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    void checkConnection();
    const intervalId = window.setInterval(() => {
      void checkConnection();
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const data = (await response.json()) as { response?: string; error?: string };

      if (!response.ok || !data.response) {
        throw new Error(data.error ?? "Chat agent failed to respond.");
      }

      const assistantResponse = data.response;
      setConnectionStatus("online");

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistantResponse,
        },
      ]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while contacting the chat agent.";

      setError(message);
      setConnectionStatus("offline");
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I could not connect to the portfolio assistant right now. Please check if the chat backend is running.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const statusLabel =
    connectionStatus === "checking"
      ? "Checking"
      : connectionStatus === "online"
        ? "Online"
        : "Offline";

  const statusClasses =
    connectionStatus === "online"
      ? "bg-green-500"
      : connectionStatus === "offline"
        ? "bg-red-500"
        : "bg-yellow-400";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label="Portfolio chat assistant"
          className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-md border border-white/15 bg-neutral-950 text-white"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">Aaron AI Assistant</p>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/80">
                  <span className={`h-2 w-2 rounded-full ${statusClasses}`} />
                  {statusLabel}
                </span>
              </div>
              <p className="text-xs text-white/60">Ask about work, skills, and projects</p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white transition hover:border-white/25 hover:bg-white/10"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-md px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-white text-neutral-950"
                      : "border border-white/10 bg-white/8 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/8 px-4 py-3">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white/70" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white/50 [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white/30 [animation-delay:240ms]" />
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {error ? <p className="mb-2 text-xs text-white/70">{error}</p> : null}

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <label htmlFor="chat-message" className="sr-only">
                Message
              </label>
              <textarea
                id="chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage(input);
                  }
                }}
                rows={1}
                placeholder="Ask about Aaron..."
                className="max-h-28 min-h-11 flex-1 resize-none rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/30"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-neutral-950 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <HiOutlinePaperAirplane className="h-5 w-5" />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-md border border-white/15 bg-white text-neutral-950 transition hover:scale-105 hover:bg-white/90"
      >
        {isOpen ? (
          <HiOutlineXMark className="h-6 w-6" />
        ) : (
          <HiOutlineChatBubbleLeftRight className="h-7 w-7" />
        )}
      </button>
    </div>
  );
}
