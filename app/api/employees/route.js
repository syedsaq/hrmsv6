import { NextResponse } from 'next/server';
import  dbConnect  from '@/lib/dbConnect';
import Employee from '@/models/Employee';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { adminMiddleware } from '@/lib/middleware';

export const GET = adminMiddleware(async (req) => {
  await dbConnect();
  const employees = await Employee.find({});
  return NextResponse.json(employees);
});

export const POST = adminMiddleware(async (req) => {
  try {
    await dbConnect();
    const body = await req.json();

    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'position', 'department', 'salary', 'joinDate'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
    }

    const employee = await Employee.create(body);

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      existingUser.employeeId = employee._id;
      existingUser.name = `${body.firstName} ${body.lastName}`;
      await existingUser.save();
    } else {
      const hashedPassword = await bcrypt.hash('qwertry', 10); // default password
      await User.create({
        name: `${body.firstName} ${body.lastName}`,
        email: body.email,
        password: hashedPassword,
        role: 'user',
        employeeId: employee._id
      });
    }

    return NextResponse.json({ success: true, employee, message: 'Employee created' }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
