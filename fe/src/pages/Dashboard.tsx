import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getSocket, getUsername, getRoomId, disconnect } from "../socket";

interface Message {
  type: "chat" | "system";
  author?: string;
  message: string;
  timestamp?: number;
}

export const Dashboard = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const username = getUsername();
  const roomId = getRoomId();

  useEffect(() => {
    const socket = getSocket();

    if (!socket) {
      toast.error("Not connected to any room");
      navigate("/signup");
      return;
    }

    socketRef.current = socket;

    const handleMessage = (event: MessageEvent) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        console.warn("Invalid JSON received");
        return;
      }

      if (data.type === "system") {
        setMessages((prev) => [
          ...prev,
          { type: "system", message: data.payload.message, timestamp: Date.now() },
        ]);
      }

      if (data.type === "chat") {
        setMessages((prev) => [
          ...prev,
          {
            type: "chat",
            author: data.payload.author,
            message: data.payload.message,
            timestamp: Date.now(),
          },
        ]);
      }
    };

    const handleOpen = () => {
      setIsConnected(true);
      toast.success(`Connected to room: ${roomId}`, { icon: "🎉" });
    };

    const handleClose = () => {
      setIsConnected(false);
      toast.error("Disconnected from room");
    };

    const handleError = () => {
      setIsConnected(false);
      toast.error("WebSocket error");
    };

    socket.addEventListener("message", handleMessage);
    socket.addEventListener("open", handleOpen);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);

    // If already open
    if (socket.readyState === WebSocket.OPEN) {
      handleOpen();
    }

    return () => {
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [navigate, roomId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      toast.error("Not connected");
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: { message: inputValue },
      })
    );

    setInputValue("");
  };

  const handleLeaveRoom = () => {
    if (window.confirm("Leave the room?")) {
      disconnect();
      navigate("/");
    }
  };

  const formatTime = (timestamp?: number) =>
    timestamp
      ? new Date(timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  return (
    <div className="h-screen bg-black flex flex-col relative overflow-hidden">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="glass-effect px-6 py-4 z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-doto text-green-400">{roomId}</h1>
            <p className="text-sm text-zinc-400">{username}</p>
          </div>
          <button
            onClick={handleLeaveRoom}
            className="px-4 py-2 bg-red-600/20 border border-red-600 text-red-400 rounded-lg"
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.author === username ? "text-right" : ""}>
            <div className="inline-block max-w-lg px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200">
              {msg.author && msg.author !== username && (
                <p className="text-xs text-green-400">{msg.author}</p>
              )}
              <p>{msg.message}</p>
              <p className="text-xs text-zinc-500">{formatTime(msg.timestamp)}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <form onSubmit={handleSendMessage} className="p-4 flex gap-2">
        <input
          value={inputValue}
          onChange={(e)=> setInputValue(e.target.value)}
          disabled={!isConnected}
          className="flex-1 input-primary"
          placeholder="Type a message..."
        />
        <button disabled={!isConnected} className="btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};
