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
        <div className="header-ca" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', padding: '4px 12px', fontSize: '12px', color: '#aaa', maxWidth: '320px', overflow: 'hidden' }}>
          <span style={{ color: '#ff6b9d', fontWeight: 600, whiteSpace: 'nowrap' }}>CA:</span>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText('BSb15HFMxMdPGfHdahwrRrciVYredgyG4xi7bsDpump'); }} title="点击复制">BSb15HFMxMdPGfHdahwrRrciVYredgyG4xi7bsDpump</span>
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
