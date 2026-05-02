export const CHAT_AGENT_URL =
  process.env.CHAT_AGENT_URL?.replace(/\/$/, "") ?? "http://localhost:8001";
