'use client';

import { useEffect, useState } from 'react';

export default function AttendanceHistory() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('/api/attendance')
      .then(res => res.json())
      .then(setRecords);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Attendance History</h2>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Check In</th>
            <th className="p-2 border">Check Out</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r._id}>
              <td className="p-2 border">{new Date(r.date).toLocaleDateString()}</td>
              <td className="p-2 border">{r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : '-'}</td>
              <td className="p-2 border">{r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
