import { model, Schema } from 'mongoose';

import { Engineer } from './engineer.models';

const EngineerSchema = new Schema<Engineer>(
  {
    person: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    daysOff: { type: [Date], default: [] },
  },
  { timestamps: true },
);

export const EngineerCollection = model('engineer', EngineerSchema);
