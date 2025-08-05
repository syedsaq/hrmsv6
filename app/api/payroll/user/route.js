// File: app/api/payroll/user/route.js (or wherever you're placing user-only payroll API)

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Payroll from '@/models/Payroll';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  await dbConnect();

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  let user;
  try {
    user = await verifyToken(token); // contains: id, role, email, etc.
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // ✅ Return only payrolls for the logged-in user
  const payrolls = await Payroll.find({ userId: user.id });

  return NextResponse.json(payrolls);
}
