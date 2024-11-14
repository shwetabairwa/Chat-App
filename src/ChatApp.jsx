// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState("CS101");
  const [cs101Message, setCs101Message] = useState("");
  const [cs102Message, setCs102Message] = useState("");
  const [cs103Message, setCs103Message] = useState("");
  const [reason, setReason] = useState("");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const users = ["CS101", "CS102", "CS103"];

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    const messageText =
      selectedUser === "CS101"
        ? cs101Message
        : selectedUser === "CS102"
        ? cs102Message
        : cs103Message;

    if (messageText.trim() === "") return;

    const newMessage = {
      sender: selectedUser,
      text: messageText,
      reason: reason.trim(),
      query: query.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (selectedUser === "CS101") {
      setCs101Message("");
    } else if (selectedUser === "CS102") {
      setCs102Message("");
    } else {
      setCs103Message("");
    }
    setReason("");
    setQuery("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center" }}>Chat App For Customer</h2>

      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", fontSize: "16px" }}
      >
        {users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={
          selectedUser === "CS101"
            ? cs101Message
            : selectedUser === "CS102"
            ? cs102Message
            : cs103Message
        }
        onChange={(e) =>
          selectedUser === "CS101"
            ? setCs101Message(e.target.value)
            : selectedUser === "CS102"
            ? setCs102Message(e.target.value)
            : setCs103Message(e.target.value)
        }
        placeholder="Enter your message"
        style={{ width: "100%", padding: "10px", marginBottom: "10px", fontSize: "16px" }}
      />

      <input
        type="text"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Enter reason"
        style={{ width: "100%", padding: "10px", marginBottom: "10px", fontSize: "16px" }}
      />

      <input
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter query"
        style={{ width: "100%", padding: "10px", marginBottom: "10px", fontSize: "16px" }}
      />

      <button
        onClick={handleSendMessage}
        style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}
      >
        Send
      </button>

      <div style={{ marginTop: "20px", maxHeight: "300px", overflowY: "auto", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#fff" }}>
        {messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "10px", padding: "10px", borderRadius: "4px", backgroundColor: msg.sender === "CS101" ? "#d1e7ff" : msg.sender === "CS102" ? "#d4edda" : "#f8d7da" }}>
              <strong>{msg.sender}</strong>: {msg.text}
              {msg.reason && <p style={{ margin: "5px 0", color: "#555" }}>Reason: {msg.reason}</p>}
              {msg.query && <p style={{ margin: "5px 0", color: "#555" }}>Query: {msg.query}</p>}
              <div style={{ fontSize: "12px", color: "#555", textAlign: "right" }}>
                {msg.timestamp}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatApp;
