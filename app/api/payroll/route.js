import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Payroll from '@/models/Payroll';
import Employee from '@/models/Employee';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  await dbConnect();

  const { month } = await req.json();
  const results = [];

  const users = await User.find({ role: 'user' }).populate('employeeId');

  for (const user of users) {
    const emp = user.employeeId;
    if (!emp) continue; // skip if no employee record

    const joinDate = new Date(emp.joinDate);
    const [year, monthNum] = month.split('-'); // e.g., '2025-08'
    const monthStart = new Date(`${year}-${monthNum}-01`);
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthEnd.getMonth() + 1);

    if (joinDate > monthEnd) continue; // skip if joined after the month

    // Calculate working days
    const totalDays = Math.floor((monthEnd - monthStart) / (1000 * 60 * 60 * 24));
    const workedDays = Math.floor((monthEnd - (joinDate > monthStart ? joinDate : monthStart)) / (1000 * 60 * 60 * 24));
    const dailySalary = emp.salary / totalDays;
    const salaryToPay = Math.round(dailySalary * workedDays);

    // Check if already paid
    const alreadyPaid = await Payroll.findOne({ employeeId: emp._id, month });
    if (alreadyPaid) continue;

    const payroll = await Payroll.create({
      userId: user._id,
      employeeId: emp._id,
      salary: salaryToPay,
      month,
      status: 'paid',
    });

    results.push(payroll);
  }

  return NextResponse.json({ message: `Payroll disbursed for ${results.length} employees` });
}
export async function GET(req) {
  await dbConnect();

  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  let user;
  try {
    user = await verifyToken(token);
    //console.log(user);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // ✅ Fetch payrolls
const payrolls = user.role === 'admin'
  ? await Payroll.find({}).populate({ path: 'userId', select: 'name email' })
  : await Payroll.find({ userId: user.id });
//console.log(payrolls);
  return NextResponse.json(payrolls);
}
