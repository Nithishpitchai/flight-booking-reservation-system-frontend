import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
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
      setMessage("⚠️ Server not reachable. Check if backend is running.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", padding: "10px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            marginTop: "10px",
            width: "100%",
            background: "blue",
            color: "white",
          }}
        >
          Register
        </button>
      </form>
      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}
