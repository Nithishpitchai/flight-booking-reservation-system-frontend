// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import FlightUpdates from "./FlightUpdates";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">
            Welcome, {user?.username || user?.name || "Guest"} 👋
          </h1>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-600 mb-6">Here’s what you can do today:</p>

        {/* Dashboard Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => navigate("/my-bookings")}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            ✈️ My Bookings
          </button>

          <button
            onClick={() => navigate("/search")}
            className="px-5 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
          >
            🔍 Search Flights
          </button>

          <button
            onClick={() => navigate("/live-status")}
            className="px-5 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
          >
            📡 Live Flight Status
          </button>
        </div>

        {/* Real-Time Updates */}
        <div className="mt-8">
          <FlightUpdates />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
