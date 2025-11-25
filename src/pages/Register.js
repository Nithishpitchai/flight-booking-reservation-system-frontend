import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_BACKEND_URL; // ⬅️ Using deployed backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Registration successful! Please login.");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(`❌ Registration failed: ${data.message || "Try again"}`);
      }
    } catch (error) {
      setMessage("⚠️ Server not reachable. Check backend deployment URL.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", color: "black" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            display: "block",
            margin: "10px 0",
            padding: "12px",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            display: "block",
            margin: "10px 0",
            padding: "12px",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            display: "block",
            margin: "10px 0",
            padding: "12px",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            marginTop: "10px",
            width: "100%",
            background: "#2563eb",
            color: "white",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "15px",
            padding: "10px",
            background: "#f1f5f9",
            borderRadius: "6px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
