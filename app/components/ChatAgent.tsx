"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { HiOutlineChatBubbleLeftRight, HiOutlinePaperAirplane, HiOutlineXMark } from "react-icons/hi2";

type ChatRole = "assistant" | "user";
type ChatMode = "casual" | "rag" | "blocked" | "direct" | "hybrid";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  mode?: ChatMode;
};

type ConnectionStatus = "checking" | "online" | "offline";

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hi, I'm here if you'd like to ask anything about Aaron.",
  },
];

const offlineMessages = [
  "Aaron AI Assistant is not available right now. Please try again shortly.",
  "I'm not available at the moment, but I should be back soon.",
  "Aaron AI Assistant is taking a quick pause. Please try again later.",
  "I can't respond right now. Please check back in a bit.",
  "Aaron AI Assistant is temporarily unavailable.",
  "I'm having trouble replying right now. Please try again soon.",
  "Aaron AI Assistant is away for a moment. Try again shortly.",
  "I'm not ready to chat right now, but I'll be back soon.",
  "Aaron AI Assistant is currently unavailable. Please try again later.",
  "I can't answer at the moment. Please come back in a little while.",
  "Aaron AI Assistant needs a moment before responding.",
  "I'm temporarily unable to reply right now.",
  "Aaron AI Assistant is offline for now. Please try again soon.",
  "I'm unavailable right now, but this should only be temporary.",
  "Aaron AI Assistant can't take messages at the moment.",
  "I'm having a quiet moment. Please try again shortly.",
  "Aaron AI Assistant is not responding right now.",
  "I can't help just yet. Please try again in a moment.",
  "Aaron AI Assistant is briefly unavailable.",
  "I'm paused right now. Please check back soon.",
  "Aaron AI Assistant is resting for a moment. Try again later.",
  "I'm not able to reply right now, but I should be back soon.",
  "Aaron AI Assistant is temporarily out of reach.",
  "I can't connect with you right now. Please try again shortly.",
  "Aaron AI Assistant is unavailable at the moment.",
  "I'm taking a short break from chatting. Please try again soon.",
  "Aaron AI Assistant is not available to answer just now.",
  "I'm unable to respond at this moment.",
  "Aaron AI Assistant is quiet right now. Please try again later.",
  "I can't reply right now, but please check back soon.",
  "Aaron AI Assistant is momentarily unavailable.",
  "I'm not online right now. Please try again in a bit.",
  "Aaron AI Assistant is taking a moment to come back online.",
  "I'm currently unable to chat.",
  "Aaron AI Assistant can't respond right now.",
  "I'm unavailable for the moment. Please try again shortly.",
  "Aaron AI Assistant is briefly offline.",
  "I'm not able to answer right now. Please come back soon.",
  "Aaron AI Assistant is away from the chat for a moment.",
  "I'm having a temporary issue responding.",
  "Aaron AI Assistant is not reachable right now.",
  "I can't continue the chat at the moment.",
  "Aaron AI Assistant is taking a short pause.",
  "I'm temporarily unavailable. Please try again soon.",
  "Aaron AI Assistant is not ready to respond yet.",
  "I'm unable to chat right now, but I'll be back soon.",
  "Aaron AI Assistant is currently taking a quick timeout.",
  "I can't answer this just yet. Please try again later.",
  "Aaron AI Assistant is unavailable right now, but only temporarily.",
  "I'm not available to respond at the moment. Please check back soon.",
];

const getRandomOfflineMessage = () =>
  offlineMessages[Math.floor(Math.random() * offlineMessages.length)];

const buildChatHistory = (messages: ChatMessage[]) =>
  messages
    .filter((message) => message.id !== "welcome")
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: message.content,
    }));

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
        body: JSON.stringify({
          message: trimmedMessage,
          history: buildChatHistory(messages),
        }),
      });

      const data = (await response.json()) as {
        response?: string;
        error?: string;
        mode?: ChatMode;
      };

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
          mode: data.mode,
        },
      ]);
    } catch {
      setError("");
      setConnectionStatus("offline");
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: getRandomOfflineMessage(),
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
          <div className="shrink-0 border-b border-white/10 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">Aaron AI Assistant</p>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/80">
                    <span className={`h-2 w-2 rounded-full ${statusClasses}`} />
                    {statusLabel}
                  </span>
                </div>
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
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex min-w-0 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] ${message.role === "user" ? "" : "space-y-2"}`}>
                  {message.role === "assistant" && message.mode ? (
                    <ChatModeBadge mode={message.mode} />
                  ) : null}
                  <div
                    className={`overflow-hidden whitespace-pre-wrap break-words rounded-md px-4 py-3 text-sm leading-relaxed [overflow-wrap:anywhere] ${
                      message.role === "user"
                        ? "bg-white text-neutral-950"
                        : "border border-white/10 bg-white/8 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
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

          <div className="shrink-0 border-t border-white/10 p-3">
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
                placeholder="Message Aaron AI Assistant..."
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

const ChatModeBadge = ({ mode }: { mode: ChatMode }) => {
  const label =
    mode === "rag"
      ? "RAG mode"
      : mode === "direct"
        ? "Direct mode"
      : mode === "hybrid"
        ? "Hybrid mode"
      : mode === "blocked"
        ? "Blocked"
        : "Casual mode";

  const dotClass =
    mode === "rag"
      ? "bg-sky-400"
      : mode === "direct"
        ? "bg-violet-400"
      : mode === "hybrid"
        ? "bg-amber-400"
      : mode === "blocked"
        ? "bg-red-400"
        : "bg-emerald-400";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/70">
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
};
