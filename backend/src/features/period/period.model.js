import mongoose from 'mongoose';

const periodSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    cycleLength: {
      type: Number,
      default: 28,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Period', periodSchema);
