import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import FlightSearch from './components/FlightSearch';
import Payment from './components/Payment';
import BookingHistory from './components/BookingHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyBooking from './pages/MyBooking';
import ProtectedRoute from './components/ProtectedRoute';
import LiveFlightStatus from './pages/LiveFlightStatus';
import { getUser, logout } from './utils/auth';

function App() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('🚪 Logged out!');
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Navigation Bar */}
      <nav className="flex flex-wrap justify-center py-4 bg-black bg-opacity-50">
        <Link to="/" className="mx-4 text-lg text-white hover:text-gray-300">
          Home
        </Link>

        {!user && (
          <>
            <Link
              to="/login"
              className="mx-4 text-lg text-white hover:text-gray-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="mx-4 text-lg text-white hover:text-gray-300"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to="/dashboard"
              className="mx-4 text-lg text-yellow-400 hover:text-yellow-200"
            >
              Dashboard
            </Link>
            <Link
              to="/my-bookings"
              className="mx-4 text-lg text-yellow-300 hover:text-yellow-100"
            >
              My Bookings
            </Link>
            <button
              onClick={handleLogout}
              className="mx-4 text-lg text-red-400 hover:text-red-200"
            >
              Logout
            </button>
          </>
        )}

        <Link
          to="/flights"
          className="mx-4 text-lg text-white hover:text-gray-300"
        >
          Search Flights
        </Link>
        <Link
          to="/payment"
          className="mx-4 text-lg text-white hover:text-gray-300"
        >
          Make Payment
        </Link>
        <Link
          to="/booking-history"
          className="mx-4 text-lg text-white hover:text-gray-300"
        >
          Booking History
        </Link>
        <Link
          to="/live-status"
          className="mx-4 text-lg text-white hover:text-gray-300"
        >
          Live Status
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center p-6">
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <h1 className="text-4xl font-bold text-white drop-shadow-lg bg-black/40 px-4 py-2 rounded inline-block">
                Welcome to Flight Booking App 🚀
              </h1>
            }
          />

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flights" element={<FlightSearch />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/live-status" element={<LiveFlightStatus />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBooking />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
