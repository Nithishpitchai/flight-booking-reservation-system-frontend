import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format Date (IST)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return alert("You must be logged in to view bookings.");

        const res = await axios.get(`${API_URL}/api/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        alert("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      alert("Booking canceled successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  // Download PDF Ticket
  const downloadTicket = (booking) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("✈ Flight Ticket", 14, 20);

    doc.setFontSize(12);
    doc.text(`Airline: ${booking.flight.airline}`, 14, 35);
    doc.text(`Flight: ${booking.flight.flightNumber}`, 14, 45);
    doc.text(
      `Route: ${booking.flight.origin} → ${booking.flight.destination}`,
      14,
      55
    );
    doc.text(`Departure: ${formatDate(booking.flight.departureTime)}`, 14, 65);
    doc.text(`Total Price: ₹${booking.totalPrice}`, 14, 75);

    // Passenger table
    doc.autoTable({
      startY: 90,
      head: [["Passenger Name"]],
      body: booking.passengers.map((p) => [p.name]),
    });

    doc.save(`ticket_${booking.flight.flightNumber}.pdf`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-black">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">📒 My Bookings</h2>

      {/* Loading Skeleton */}
      {loading && (
        <div>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="animate-pulse bg-gray-200 h-32 mb-4 rounded-lg"
            ></div>
          ))}
        </div>
      )}

      {/* No Bookings */}
      {!loading && bookings.length === 0 && (
        <p className="text-gray-600">No bookings found.</p>
      )}

      {/* Bookings List */}
      {bookings.map((booking, i) => (
        <div
          key={i}
          className="border border-gray-300 p-5 mb-5 rounded-xl shadow-md bg-white"
        >
          <h3 className="font-bold text-xl mb-2 text-blue-700">
            ✈ {booking.flight?.airline} — {booking.flight?.flightNumber}
          </h3>

          <p className="text-gray-800">
            <strong>Route:</strong> {booking.flight?.origin} ➡{" "}
            {booking.flight?.destination}
          </p>
          <p>
            <strong>Departure:</strong>{" "}
            {formatDate(booking.flight?.departureTime)}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{booking.totalPrice}
          </p>

          {/* Passengers */}
          <p className="font-semibold mt-3">👥 Passengers:</p>
          <ul className="ml-4 list-disc">
            {booking.passengers.map((p, idx) => (
              <li key={idx}>{p.name}</li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => downloadTicket(booking)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
            >
              Download Ticket PDF
            </button>

            <button
              onClick={() => cancelBooking(booking._id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
