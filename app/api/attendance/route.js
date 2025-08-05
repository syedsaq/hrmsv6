import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; 
import Attendance from '@/models/Attendance';
import { requireAuth } from '@/lib/middleware';
import mongoose from 'mongoose';

export const POST = requireAuth(async (req) => {
  await dbConnect();

  const body = await req.json();
  const { type } = body; // 'checkIn' or 'checkOut'

  const user = req.user;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ✅ Fix: Convert user.id to ObjectId to avoid CastError
  const attendance = await Attendance.findOne({
    userId: new mongoose.Types.ObjectId(user.id),
    date: today,
  });

  if (!attendance) {
    if (type === 'checkIn') {
      const newAttendance = await Attendance.create({
        userId: user.id,
        checkIn: new Date(),
        date: today,
      });

      return NextResponse.json({
        success: true,
        message: 'Check-in recorded',
        attendance: newAttendance,
      });
    } else {
      return NextResponse.json({ error: 'You must check-in before check-out' }, { status: 400 });
    }
  } else {
    if (type === 'checkOut') {
      if (attendance.checkOut) {
        return NextResponse.json({ error: 'Already checked out' }, { status: 400 });
      }

      attendance.checkOut = new Date();
      await attendance.save();

      return NextResponse.json({
        success: true,
        message: 'Check-out recorded',
        attendance,
      });
    } else {
      return NextResponse.json({ error: 'Already checked in today' }, { status: 400 });
    }
  }
});

export const GET = requireAuth(async (req) => {
  await dbConnect();
  const { user } = req;

  const query = user.role === 'admin' ? {} : { userId: user.id };
  const history = await Attendance.find(query).populate('userId', 'name email').sort({ date: -1 });

  return NextResponse.json(history);
});
