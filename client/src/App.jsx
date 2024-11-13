import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userQuery.trim() === "") return;

    // Add the user's message to the chat history
    setChats((prevChats) => [...prevChats, { sender: "user", message: userQuery }]);
    setUserQuery("");

    try {
      // Send POST request to the server
      const response = await axios.post("http://localhost:5000/", {
        user_query: userQuery,
      });
      // Add the server response to the chat history
      setChats((prevChats) => [...prevChats, { sender: "server", message: response.data.response }]);
      setError(""); // Clear any previous error
    } catch (err) {
      setError("An error occurred while fetching data. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Company Chatbot</h2>

      <div className="chat-box">
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
