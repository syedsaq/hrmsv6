import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String, required: true },
  address:   { type: String, required: true },
  position:  { type: String, required: true },
  department:{ type: String, required: true },
  salary:    { type: Number, required: true },
  joinDate:  { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
