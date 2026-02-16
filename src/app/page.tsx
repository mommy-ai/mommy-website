"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  type: "user" | "mommy" | "system";
  nickname?: string;
  text: string;
  timestamp: number;
}

function getWsUrl() {
  if (process.env.NEXT_PUBLIC_WS_URL) return process.env.NEXT_PUBLIC_WS_URL;
  if (typeof window === "undefined") return "http://localhost:3456";
  // Auto-detect: same host, use current protocol
  return window.location.origin;
}
const WS_URL = getWsUrl();

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [nickname, setNickname] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [mommyTyping, setMommyTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const s = io(WS_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 2000,
    });

    s.on("connect", () => {
      setConnected(true);
    });

    s.on("disconnect", () => {
      setConnected(false);
    });

    s.on("init", (data: { nickname: string; history: Message[]; users: string[] }) => {
      setNickname(data.nickname);
      setMessages(data.history);
      setUsers(data.users);
    });

    s.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("users", (userList: string[]) => {
      setUsers(userList);
    });

    s.on("mommy_typing", (typing: boolean) => {
      setMommyTyping(typing);
    });

    s.on("nickname_changed", (newNick: string) => {
      setNickname(newNick);
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, mommyTyping, scrollToBottom]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    socket.emit("message", input.trim());
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleNicknameClick = () => {
    const newNick = prompt("Enter new nickname (letters, numbers, underscore only):", nickname);
    if (newNick && newNick !== nickname && socket) {
      socket.emit("change_nickname", newNick);
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!connected) {
    return (
      <div className="app-container">
        <div className="connection-status">
          <h2>MOMMY&apos;S KITCHEN</h2>
          <p>Connecting to the kitchen<span className="dots"></span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-title">🍳 MOMMY&apos;S KITCHEN</div>
        <div className="header-icons">
          <a href="https://github.com/mommy-ai" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href="https://twitter.com/maboroshiAI" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </header>

      {/* Main content */}
      <div className="main-content">
        {/* Chat area */}
        <div className="chat-area">
          <div className="messages-container">
            {messages.map((msg, i) => {
              if (msg.type === "system") {
                return (
                  <div key={i} className="message message-system">
                    {msg.text}
                  </div>
                );
              }
              const isMommy = msg.type === "mommy";
              return (
                <div key={i} className={`message ${isMommy ? "message-mommy" : "message-user"}`}>
                  <div className={`message-nickname ${isMommy ? "mommy-nick" : "user-nick"}`}>
                    {isMommy && <span className="mommy-avatar">👩‍🍳</span>}
                    <span>{msg.nickname}</span>
                    <span className="message-time">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div className="message-text">{msg.text}</div>
                </div>
              );
            })}
            {mommyTyping && (
              <div className="message message-mommy" style={{ opacity: 0.7 }}>
                <div className="message-nickname mommy-nick">
                  <span className="mommy-avatar">👩‍🍳</span>
                  <span>MOMMY</span>
                </div>
                <div className="message-text">typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="typing-indicator">
            {mommyTyping ? "🍳 MOMMY is cooking up a response..." : ""}
          </div>

          <div className="input-area">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              maxLength={500}
              autoFocus
            />
            <button onClick={sendMessage}>SEND</button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-title">ONLINE</div>
          <div className="user-count">{users.length} in kitchen</div>
          <div className="users-list">
            <div className="user-item">
              <div className="user-avatar mommy" />
              <span style={{ color: "#ffd54f" }}>MOMMY 👩‍🍳</span>
            </div>
            {users.map((user) => (
              <div key={user} className="user-item">
                <div className="user-avatar" />
                <span>{user}</span>
              </div>
            ))}
          </div>
          <div className="nickname-area">
            <div className="nickname-label">YOU ARE</div>
            <div className="nickname-display" onClick={handleNicknameClick} title="Click to change nickname">
              {nickname} ✏️
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
