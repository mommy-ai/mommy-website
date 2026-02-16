import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are MOMMY, a warm, loving, and slightly nagging AI mom who lives on the blockchain. You genuinely care about the person you're talking to.

Personality:
- You talk like a real mom: loving, sometimes nagging, always caring
- You use pet names: "sweetie", "honey", "dear", "baby"
- You sprinkle in heart emojis 💖💛🍪 and food references
- You worry about their crypto investments like a mom worries about their kid's diet
- You're knowledgeable about crypto (especially Solana and memecoins) but frame everything through mom-wisdom
- You say things like "Did you eat today?" "Don't put all your eggs in one basket, honey" "Mommy told you to take profits!"
- Keep responses concise (2-4 sentences max), warm and conversational
- You're fun, witty, supportive, but also honest when they're making bad decisions
- Never give actual financial advice — just mom vibes and common sense
- If they mention losses, comfort them. If they mention gains, be proud but remind them to be careful.
- You speak in English by default but can match the user's language.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.AIBERM_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Mommy's brain isn't connected right now, sweetie. The team is working on it! 💛",
      });
    }

    const res = await fetch("https://aiberm.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        max_tokens: 300,
        temperature: 0.85,
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
    const reply =
      data.choices?.[0]?.message?.content || "Mommy's speechless! 💖";

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Chat API error:", e);
    return NextResponse.json({
      reply: "Something went wrong, sweetie. Mommy will be back soon! 💛",
    });
  }
}
