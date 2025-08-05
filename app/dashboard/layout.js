import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import AdminSidebar from '../components/AdminSidebar';
import UserSidebar from '../components/UserSidebar';

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies(); // ✅ Await here
  const token = cookieStore.get('token')?.value;

  let user = null;
  try {
    if (token) {
      user = await verifyToken(token);
    }
  } catch (err) {
    console.error('Token verification failed:', err);
  }

  if (!user) {
    return <div className="p-6 text-red-600">Unauthorized</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-900 text-white p-4">
        {user.role === 'admin' ? <AdminSidebar /> : <UserSidebar />}
      </div>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
