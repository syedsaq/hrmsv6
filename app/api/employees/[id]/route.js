import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Employee from '@/models/Employee';
import { adminMiddleware } from '@/lib/middleware';

export const GET = adminMiddleware(async (req, { params }) => {
  await dbConnect();
  const employee = await Employee.findById(params.id);
  if (!employee) {
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
  }
  return NextResponse.json(employee);
});

export const PUT = adminMiddleware(async (req, { params }) => {
  await dbConnect();
  const body = await req.json();
  const updated = await Employee.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
});

export const DELETE = adminMiddleware(async (req, { params }) => {
  await dbConnect();
  await Employee.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: 'Employee deleted' });
});
