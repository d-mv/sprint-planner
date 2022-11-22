import { model, Schema } from 'mongoose';

import { App } from './app.models';

const AppSchema = new Schema<App>(
  {
    assignedEngineers: { type: [String], default: [] },
    idleTimeS: { type: Number, default: 5 },
  },
  { timestamps: true },
);

export const AppCollection = model('app', AppSchema);
