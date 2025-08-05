'use client';

import { useEffect, useState } from 'react';

export default function AdminPayrollPage() {
  const [month, setMonth] = useState('');
  const [payrolls, setPayrolls] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPayrolls = async () => {
    try {
      const res = await fetch('/api/payroll');
      const data = await res.json();
      setPayrolls(data);
    } catch (err) {
      console.error('Failed to fetch payrolls:', err);
    }
  };

  const disburse = async () => {
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/payroll', {
        method: 'POST',
        body: JSON.stringify({ month }),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || 'Failed to disburse payroll');

      setMessage(json.message || 'Payroll disbursed successfully');
      fetchPayrolls();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payroll Disbursement</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={disburse}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!month || loading}
        >
          {loading ? 'Disbursing...' : 'Disburse Payroll'}
        </button>
      </div>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <table className="w-full table-auto border mt-4 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Salary</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((p) => (
            <tr key={p._id}>
              <td className="p-2 border">{p.userId?.name || '—'}</td>
              <td className="p-2 border">{p.userId?.email || '—'}</td>
              <td className="p-2 border">{p.month}</td>
              <td className="p-2 border">${p.salary}</td>
              <td className="p-2 border text-green-600">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
