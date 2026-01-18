import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConenction } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  // 🔌 Socket connection
  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConenction();

    socketRef.current.emit("joinChat", {
      userId,
      targetUserId,
      firstName: user.firstName,
    });

    socketRef.current.on("messageReceived", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  // ⬇️ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📤 Send message (NO local push)
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-base-100 rounded-3xl shadow-xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b bg-gradient-to-r from-primary to-secondary text-white">
          <div className="avatar online">
            <div className="w-12 rounded-full border-2 border-white">
              <img src="https://i.pravatar.cc/150" alt="profile" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-lg">Chat</h2>
            <p className="text-sm opacity-80">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-base-200">
          {messages.map((msg, index) => {
            const isMe = msg.userId === userId;

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow
                    ${
                      isMe
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-base-100 rounded-bl-none"
                    }`}
                >
                  {!isMe && (
                    <p className="text-xs font-semibold opacity-70">
                      {msg.firstName}
                    </p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-[10px] mt-1 opacity-60 text-right">
                    {msg.time}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-base-100 flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered w-full rounded-full"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="btn btn-primary btn-circle text-white"
          >
            ➤
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;
