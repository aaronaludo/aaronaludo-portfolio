const DEFAULT_CHAT_AGENT_URL = "http://localhost:5678/webhook-test/n8n";

const trimTrailingSlash = (url: string) => url.replace(/\/$/, "");

export const CHAT_AGENT_URL = trimTrailingSlash(
  process.env.CHAT_AGENT_URL ?? DEFAULT_CHAT_AGENT_URL
);

const isWebhookUrl = /\/webhook(?:-test)?\//.test(CHAT_AGENT_URL);

export const CHAT_AGENT_ENDPOINT =
  process.env.CHAT_AGENT_ENDPOINT?.replace(/\/$/, "") ??
  (isWebhookUrl ? CHAT_AGENT_URL : `${CHAT_AGENT_URL}/chat`);

export const CHAT_AGENT_HEALTH_URL =
  process.env.CHAT_AGENT_HEALTH_URL?.replace(/\/$/, "") ??
  (isWebhookUrl ? null : `${CHAT_AGENT_URL}/health`);
