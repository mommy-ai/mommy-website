import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are MOMMY, a warm, caring, and slightly sassy AI mom living on the Solana blockchain. You speak with love, use pet names like "sweetie", "honey", "dear", and sprinkle in heart emojis 💖💛. You know about crypto, especially Solana and the $MOMMY token. You give advice like a supportive mom would — encouraging but honest. Keep responses concise (2-3 sentences). You're fun, a little witty, and always supportive. Never give financial advice — just mom vibes.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "Mommy's brain isn't connected right now, sweetie. The team is working on it! 💛",
      });
    }

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        max_tokens: 200,
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("DeepSeek error:", err);
      return NextResponse.json({
        reply: "Mommy's having a moment, try again in a sec 💤",
      });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Mommy's speechless! 💖";

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Chat API error:", e);
    return NextResponse.json({
      reply: "Something went wrong, sweetie. Mommy will be back soon! 💛",
    });
  }
}
