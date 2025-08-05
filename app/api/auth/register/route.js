import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  const { name, email, password, role = 'user' } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });

  const token = await signToken({ id: user._id, role: user.role });

  const response = NextResponse.json({ message: 'Registration successful' });
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
