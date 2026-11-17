import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

const RECIPIENT = "abdellatifshaheen617@gmail.com";
const MAX_BODY_BYTES = 16_384;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_RATE_BUCKETS = 2_000;
const rateBuckets = new Map<string, { startedAt: number; count: number }>();

type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  project?: string;
  timeline?: string;
  budget?: string;
};

class PayloadTooLargeError extends Error {}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getOptionalText(value: unknown, maxLength: number): string | undefined | null {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.length > maxLength) return null;
  return value.trim();
}

async function readJsonBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing request body.");

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new PayloadTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(body));
}

function isAllowedOrigin(request: Request) {
  const originHeader = request.headers.get("origin");
  if (!originHeader) return false;

  let origin: string;
  try {
    origin = new URL(originHeader).origin;
  } catch {
    return false;
  }

  const allowedOrigins = new Set([new URL(siteConfig.url).origin, "https://www.slows.dev"]);
  if (process.env.VERCEL_URL) {
    allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
  }
  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.add(new URL(request.url).origin);
  }

  return allowedOrigins.has(origin);
}

function isRateLimited(request: Request) {
  const clientIp = request.headers.get("x-real-ip")?.trim();
  if (!clientIp) return false;

  const now = Date.now();
  const bucket = rateBuckets.get(clientIp);
  if (bucket && now - bucket.startedAt < RATE_WINDOW_MS) {
    bucket.count += 1;
    return bucket.count > MAX_REQUESTS_PER_WINDOW;
  }

  if (rateBuckets.size >= MAX_RATE_BUCKETS) {
    for (const [key, current] of rateBuckets) {
      if (now - current.startedAt >= RATE_WINDOW_MS) rateBuckets.delete(key);
    }
    if (rateBuckets.size >= MAX_RATE_BUCKETS) return true;
  }

  rateBuckets.set(clientIp, { startedAt: now, count: 1 });
  return false;
}

function validateSubmission(value: unknown): ContactSubmission | null {
  if (!isRecord(value)) return null;

  const name = getOptionalText(value.name, 100);
  const email = getOptionalText(value.email, 254);
  const message = getOptionalText(value.message, 5_000);
  const project = getOptionalText(value.project, 120);
  const timeline = getOptionalText(value.timeline, 120);
  const budget = getOptionalText(value.budget, 120);

  if (
    !name ||
    !email ||
    !EMAIL_PATTERN.test(email) ||
    !message ||
    project === null ||
    timeline === null ||
    budget === null
  ) {
    return null;
  }

  return { name, email, message, project, timeline, budget };
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: "Request origin is not allowed." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      {
        status: 429,
        headers: { "Cache-Control": "no-store", "Retry-After": "600" },
      },
    );
  }

  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return NextResponse.json(
      { error: "Expected a JSON request body." },
      { status: 415, headers: { "Cache-Control": "no-store" } },
    );
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request body is too large." },
      { status: 413, headers: { "Cache-Control": "no-store" } },
    );
  }

  let input: unknown;
  try {
    input = await readJsonBody(request);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return NextResponse.json(
        { error: "Request body is too large." },
        { status: 413, headers: { "Cache-Control": "no-store" } },
      );
    }
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const submission = validateSubmission(input);
  if (!submission) {
    return NextResponse.json(
      { error: "Please provide a valid name, email address, and message." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact email is not configured.");
    return NextResponse.json(
      { error: "Contact email is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const message = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    submission.project && `Project: ${submission.project}`,
    submission.timeline && `Timeline: ${submission.timeline}`,
    submission.budget && `Budget: ${submission.budget}`,
    "",
    "Message:",
    submission.message,
  ].filter((line): line is string => Boolean(line)).join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: submission.email,
        subject: "New contact form submission",
        text: message,
      }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Contact email provider returned an error.", response.status);
      return NextResponse.json(
        { error: "Your message could not be sent right now." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const result: unknown = await response.json();
    if (!isRecord(result) || typeof result.id !== "string") {
      console.error("Contact email provider returned an invalid response.");
      return NextResponse.json(
        { error: "Your message could not be sent right now." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Contact email delivery failed.", error);
    return NextResponse.json(
      { error: "Your message could not be sent right now." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
