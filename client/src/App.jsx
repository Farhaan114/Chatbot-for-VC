import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");

  // Ref for the chat container to enable automatic scrolling
  const chatBoxRef = useRef(null);

  // Display welcome message on initial load
  useEffect(() => {
    setChats([{ sender: "server", message: "Hello! I’m your Company Chatbot. How can I assist you today?" }]);
  }, []);

  // Scroll to the bottom whenever chats change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chats]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userQuery.trim() === "") return;

    // Add the user's message to the chat history
    setChats((prevChats) => [...prevChats, { sender: "user", message: userQuery }]);
    const query = userQuery.toLowerCase();
    setUserQuery("");

    try {
      if (query === "hi") {
        // Respond with a special introduction message if user says "hi"
        setChats((prevChats) => [
          ...prevChats,
          { sender: "server", message: "Hi there! I’m your virtual assistant. Feel free to ask me about company details like address, contact, or reviews." }
        ]);
      } else if (query === "bye") {
        // Display a farewell message if user says "bye"
        setChats((prevChats) => [
          ...prevChats,
          { sender: "server", message: "Goodbye! Thank you for chatting with me. Have a great day!" }
        ]);
      } else {
        // Send POST request to the server for other queries
        const response = await axios.post("http://localhost:5000/", { user_query: userQuery });
        
        // Add the server response to the chat history
        setChats((prevChats) => [
          ...prevChats,
          { sender: "server", message: response.data.response }
        ]);
      }
      setError(""); // Clear any previous error
    } catch (err) {
      setError("An error occurred while fetching data. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Company Chatbot</h2>

      <div className="chat-box" ref={chatBoxRef}>
        {chats.map((chat, index) => (
          <div key={index} className={`chat-bubble ${chat.sender}`}>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <input
            type="text"
            id="user_query"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            required
            placeholder="Type your message..."
          />
        </div>
        <button type="submit">Send</button>
      </form>

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
