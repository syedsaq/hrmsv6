import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let user = null;
  try {
    if (token) {
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
      user = payload;
    }
  } catch (err) {
    console.error('Token decode failed:', err);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome {user?.name || 'User'}</h1>
      <p className="mt-2 text-gray-600">Role: {user?.role}</p>
    </div>
  );
}
