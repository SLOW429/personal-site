import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT =
  "You are the assistant embedded on SLOW's personal portfolio site. " +
  "He is a developer, automation builder, and voiceover artist who builds Discord bots, real-time systems, and automation tooling. " +
  "Answer visitor questions about him, his work, and how to reach him in 2-4 concise sentences. " +
  "If you do not know something, say so honestly instead of guessing.";

const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_RATE_BUCKETS = 5_000;
const rateBuckets = new Map<string, { startedAt: number; count: number }>();

type ChatMessage = { role: "user" | "assistant"; content: string };

function getClientKey(request: NextRequest) {
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (bucket && now - bucket.startedAt < RATE_WINDOW_MS) {
    bucket.count += 1;
    return bucket.count > MAX_REQUESTS_PER_WINDOW;
  }

  if (rateBuckets.size >= MAX_RATE_BUCKETS) {
    for (const [clientKey, current] of rateBuckets) {
      if (now - current.startedAt >= RATE_WINDOW_MS) rateBuckets.delete(clientKey);
    }
    if (rateBuckets.size >= MAX_RATE_BUCKETS) return true;
  }

  rateBuckets.set(key, { startedAt: now, count: 1 });
  return false;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const rawMessages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0 || rawMessages.length > MAX_MESSAGES) {
    return null;
  }

  const messages: ChatMessage[] = [];
  for (const message of rawMessages) {
    if (!message || typeof message !== "object" || Array.isArray(message)) return null;
    const item = message as { role?: unknown; content?: unknown };
    if (item.role !== "user" && item.role !== "assistant") return null;
    if (typeof item.content !== "string" || !item.content.trim()) return null;
    if (item.content.length > MAX_MESSAGE_LENGTH) return null;
    messages.push({ role: item.role, content: item.content.trim() });
  }

  return messages;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The assistant isn't configured yet — add GROQ_API_KEY to the server environment." },
      { status: 500 },
    );
  }

  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > 128_000) {
    return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return NextResponse.json(
      { error: "Provide 1-12 valid user or assistant messages with up to 2,000 characters each." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(20_000),
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 500,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "The assistant service is temporarily unavailable." },
        { status: 502 },
      );
    }

    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("choices" in data) || !Array.isArray(data.choices)) {
      return NextResponse.json({ error: "The assistant returned an invalid response." }, { status: 502 });
    }

    const firstChoice = data.choices[0];
    const message = firstChoice && typeof firstChoice === "object" && "message" in firstChoice
      ? firstChoice.message
      : null;
    const text = message && typeof message === "object" && "content" in message && typeof message.content === "string"
      ? message.content.trim()
      : "";

    if (!text) {
      return NextResponse.json({ error: "The assistant returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the AI service. Try again in a moment." },
      { status: 502 },
    );
  }
}
