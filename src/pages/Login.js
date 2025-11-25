import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Load backend from .env
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token);

        setEmail("");
        setPassword("");

        // OPTIONAL: redirect after login
        window.location.href = "/dashboard";
      } else {
        setMessage(`❌ Login failed: ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Cannot connect to backend. Check API deployment.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}
