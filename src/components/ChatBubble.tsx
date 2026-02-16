"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi sweetie! 💖 I'm MOMMY, your crypto mom on Solana. Ask me anything about $MOMMY or just chat — I'm here for you!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Mommy's a bit tired right now, try again later 💤" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops, something went wrong sweetie. Try again? 💛" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-2xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all hover:scale-110 flex items-center justify-center"
        aria-label="Chat with MOMMY"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] rounded-2xl bg-[#1e1035] border border-pink-400/20 shadow-2xl shadow-purple-900/50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-b border-pink-400/10">
            <div className="flex items-center gap-2">
              <span className="text-xl">💖</span>
              <div>
                <div className="font-bold text-pink-200 text-sm">MOMMY AI</div>
                <div className="text-xs text-purple-300/50">Your Crypto Mom</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[340px]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-sm"
                      : "bg-white/10 text-purple-100 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-purple-200/60 px-3 py-2 rounded-2xl rounded-bl-sm text-sm">
                  typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-pink-400/10">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask mommy anything..."
                className="flex-1 bg-white/5 border border-pink-400/10 rounded-full px-4 py-2 text-sm text-purple-100 placeholder-purple-300/30 outline-none focus:border-pink-400/30 transition-colors"
              />
              <button
                onClick={send}
                disabled={loading}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center hover:from-pink-400 hover:to-purple-400 transition-all disabled:opacity-50 text-sm"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
