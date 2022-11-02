import { model, Schema } from 'mongoose';

const SprintSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true, unique: true },
    endDate: { type: Date, required: true, unique: true },
    daysOff: { type: [Date], default: [], unique: true },
  },
  { timestamps: true },
);

export const SprintCollection = model('sprint', SprintSchema);
