import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the server
      const response = await axios.post("http://localhost:5000/", {
        user_query: userQuery,
      });
      setResult(response.data.response);  // Assuming `response.data.response` contains the chatbot response
      setError(""); // Clear any previous error
    } catch (err) {
      setError("An error occurred while fetching data. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Company Chatbot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user_query">Enter your query:</label>
          <input
            type="text"
            id="user_query"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            required
            placeholder="Your query here..."
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div className="result">
          <h4>Result:</h4>
          <p>{result}</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
