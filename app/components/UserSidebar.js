'use client';
import Link from 'next/link';
import {LogoutButton} from './LogoutButton';

export default function UserSidebar() {
  return (
    <nav className="space-y-4">
      <h2 className="text-xl font-bold">User Menu</h2>
      <Link href="/dashboard/user/attendance/mark" className="block">Mark Attendance</Link>
      <Link href="/dashboard/user/attendance/history" className="block">My Attendance</Link>
      <Link href="/dashboard/user/payroll" className="block">My Salary</Link>
         <div className="pt-6">
        <LogoutButton /> {/* ✅ Show logout button here */}
      </div>
    </nav>
  );
}
