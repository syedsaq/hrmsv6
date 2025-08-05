'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/employees', {
          credentials: 'include', // ✅ send cookie (token)
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'Failed to fetch employees');
        }

        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error('Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link
          href="/dashboard/admin/employees/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Employee
        </Link>
      </div>

      <ul className="space-y-2">
        {employees.map(emp => (
          <li key={emp._id} className="bg-white shadow p-4 rounded">
            <strong>{emp.firstName} {emp.lastName}</strong> – {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
