'use client';

import { useRouter } from 'next/navigation';


export  function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
