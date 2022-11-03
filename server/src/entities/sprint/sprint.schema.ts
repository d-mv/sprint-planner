import { model, Schema } from 'mongoose';

const SprintSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true, unique: true },
    endDate: { type: Date, required: true, unique: true },
    daysOff: { type: [Date], default: [] },
  },
  { timestamps: true },
);

export const SprintCollection = model('sprint', SprintSchema);
