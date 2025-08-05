import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  month: {
    type: String, // Format: "2025-08"
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'paid'
  },
}, { timestamps: true });

payrollSchema.index({ userId: 1, month: 1 }, { unique: true });

export default mongoose.models.Payroll || mongoose.model('Payroll', payrollSchema);
