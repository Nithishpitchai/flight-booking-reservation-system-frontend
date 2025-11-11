import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function FlightUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('✅ Connected to Flight Updates server');
    });

    socket.on('flightUpdate', (data) => {
      setUpdates((prev) => [data, ...prev]); // new updates on top
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✈️ Real-Time Flight Updates</h2>
      {updates.length === 0 ? (
        <p className="text-gray-600">No updates yet. Please wait...</p>
      ) : (
        <ul className="space-y-3">
          {updates.map((update, index) => (
            <li key={index} className="p-4 bg-white shadow rounded-lg border">
              <p className="font-semibold">
                {update.airline} {update.flightNumber}
              </p>
              <p className="text-sm text-gray-700">
                {update.origin} → {update.destination}
              </p>
              <p className="text-sm">
                <span className="font-bold">Status:</span>{' '}
                <span className="text-blue-600">{update.status}</span>
              </p>
              <p className="text-xs text-gray-500">
                Updated at: {new Date(update.timestamp).toLocaleTimeString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FlightUpdates;
