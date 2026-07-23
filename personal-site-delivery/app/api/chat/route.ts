import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT =
  "You are the assistant embedded on SLOW's (Abdellatif Shaheen) personal portfolio site. " +
  "He is a developer, automation builder, and voiceover artist based in Qatar, and the owner of the SLOW Discord community. " +
  "He builds Discord bots (HR-BOT, discord-bot), real-time systems (chat-platform), and automation tooling. " +
  "Answer visitor questions about him, his work, and how to reach him, in 2-4 friendly, concise sentences. " +
  "If you don't know something specific, say so honestly instead of making it up.";

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "The assistant isn't configured yet — add GROQ_API_KEY to your environment variables." },
      { status: 500 }
    );
  }

  let messages;
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 500,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "The AI service returned an error." },
        { status: response.status }
      );
    }

    const text = data.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "Couldn't reach the AI service. Try again in a moment." }, { status: 502 });
  }
}
