import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

const token = await signToken({
  id: user._id.toString(), // ✅ Convert ObjectId to string here
  name: user.name,
  email: user.email,
  role: user.role,
});

  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
