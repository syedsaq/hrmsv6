'use client';

import { useEffect, useState } from 'react';

export default function UserPayrollPage() {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    fetch('/api/payroll')
      .then(res => res.json())
      .then(setPayrolls);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Payroll History</h2>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Salary</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map(p => (
            <tr key={p._id}>
              <td className="p-2 border">{p.month}</td>
              <td className="p-2 border">${p.salary}</td>
              <td className="p-2 border text-green-700">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
