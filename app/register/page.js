'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || 'Registration failed');

      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name')} placeholder="Name"
          className="w-full p-2 border rounded" />
        <p className="text-sm text-red-500">{errors.name?.message}</p>

        <input {...register('email')} placeholder="Email"
          className="w-full p-2 border rounded" />
        <p className="text-sm text-red-500">{errors.email?.message}</p>

        <input {...register('password')} type="password" placeholder="Password"
          className="w-full p-2 border rounded" />
        <p className="text-sm text-red-500">{errors.password?.message}</p>

        <button disabled={isSubmitting} type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-sm">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
    </div>
  );
}
