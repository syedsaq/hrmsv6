'use client';

import { useState } from 'react';

export default function MarkAttendance() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const mark = async (type) => {
    setMessage('');
    setError('');
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        body: JSON.stringify({ type }),
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setMessage(`${type} successful`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="flex gap-4">
        <button onClick={() => mark('checkIn')} className="bg-blue-600 text-white px-4 py-2 rounded">
          Check In
        </button>
        <button onClick={() => mark('checkOut')} className="bg-green-600 text-white px-4 py-2 rounded">
          Check Out
        </button>
      </div>
    </div>
  );
}
