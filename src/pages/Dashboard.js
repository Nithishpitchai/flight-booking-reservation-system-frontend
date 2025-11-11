// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import FlightUpdates from './FlightUpdates';

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username || 'Guest'} 👋</h1>
        <p className="text-gray-600 mb-6">This is your dashboard.</p>

        <div className="space-x-4 mb-6">
          <button
            onClick={() => navigate('/my-bookings')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            My Bookings
          </button>

          <button
            onClick={() => navigate('/search')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          >
            Search Flights
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Real-time Flight Updates Section */}
        <FlightUpdates />
      </div>
    </div>
  );
}

export default Dashboard;
