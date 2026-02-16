"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MSG =
  "Hey sweetie~ 💖 Welcome home! Mommy's here. Tell me what's on your mind — crypto, life, anything. I'm all ears, honey! 🍪";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MSG },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oh no, mommy's brain glitched! Try again, sweetie 💛",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
      <div
        ref={scrollRef}
        className="chat-scroll flex-1 overflow-y-auto p-3 sm:p-4 space-y-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg-enter flex items-end gap-2 sm:gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            {msg.role === "assistant" && (
              <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded pixel-border-light overflow-hidden">
                <Image
                  src="/mommy-avatar.jpg"
                  alt="MOMMY"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[80%] sm:max-w-[70%] px-3 py-2 sm:px-4 sm:py-3 ${
                msg.role === "assistant"
                  ? "pixel-border bg-[#3d2415] text-[var(--pixel-cream)]"
                  : "pixel-border-light bg-[#ff9b50]/20 text-[var(--pixel-cream)]"
              }`}
              style={{ fontFamily: "'VT323', monospace" }}
            >
              <p className="text-lg sm:text-xl leading-relaxed whitespace-pre-wrap break-words">
                {msg.content}
              </p>
            </div>

            {/* User icon */}
            {msg.role === "user" && (
              <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 pixel-border-light bg-[var(--pixel-orange)] flex items-center justify-center text-sm sm:text-base">
                <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "10px" }}>
                  YOU
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="msg-enter flex items-end gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded pixel-border-light overflow-hidden">
              <Image
                src="/mommy-avatar.jpg"
                alt="MOMMY"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pixel-border bg-[#3d2415] px-4 py-3">
              <div className="flex gap-1">
                <span className="typing-dot text-xl text-[var(--pixel-pink)]">●</span>
                <span className="typing-dot text-xl text-[var(--pixel-orange)]">●</span>
                <span className="typing-dot text-xl text-[var(--pixel-pink)]">●</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-3 sm:p-4 bg-[var(--pixel-dark)]">
        <div className="pixel-border bg-[#2d1b0e] flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Talk to mommy..."
            disabled={loading}
            className="flex-1 bg-transparent px-3 py-2 sm:px-4 sm:py-3 text-lg sm:text-xl text-[var(--pixel-cream)] placeholder-[var(--pixel-border)] disabled:opacity-50"
            style={{ fontFamily: "'VT323', monospace" }}
            autoFocus
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="px-3 py-2 sm:px-5 sm:py-3 text-base sm:text-lg bg-[var(--pixel-pink)] text-white hover:bg-[var(--pixel-orange)] disabled:opacity-30 transition-colors cursor-pointer"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "11px" }}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
