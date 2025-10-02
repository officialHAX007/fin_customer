import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    memberNumber: { type: Number, required: true, min: 1 },
    interests: { type: String, required: true, trim: true } // e.g. "movies, football"
  },
  { timestamps: true }
);

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
