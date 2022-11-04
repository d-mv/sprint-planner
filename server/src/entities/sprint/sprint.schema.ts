import { model, Schema } from 'mongoose';
import { DayType, Sprint } from './sprint.models';

const DaysOffSchema = new Schema<DayType>({
  date: { type: Date, required: true },
  month: { type: Number, required: true },
  isWeekend: { type: Boolean },
  isOff: { type: Boolean },
  isWork: { type: Boolean },
});

const SprintSchema = new Schema<Sprint>(
  {
    name: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true, unique: true },
    endDate: { type: Date, required: true, unique: true },
    days: { type: [DaysOffSchema], default: [] },
  },
  { timestamps: true },
);

export const SprintCollection = model('sprint', SprintSchema);
