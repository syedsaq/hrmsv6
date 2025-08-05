'use client';
import Link from 'next/link';
import {LogoutButton} from './LogoutButton';
export default function AdminSidebar() {
  return (
    <nav className="space-y-4">
      <h2 className="text-xl font-bold">Admin Menu</h2>
      
      <Link href="/dashboard/admin/employees" className="block">Employees</Link>
      <Link href="/dashboard/admin/attendance" className="block">Attendance</Link>
      <Link href="/dashboard/admin/payroll" className="block">Payroll</Link>
       <div className="pt-6">
        <LogoutButton /> {/* ✅ Show logout button here */}
      </div>
    </nav>
  );
}
