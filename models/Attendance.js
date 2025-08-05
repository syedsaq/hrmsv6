import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  checkIn: Date,
  checkOut: Date,
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0), // unique per day
    required: true
  }
}, { timestamps: true });

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
