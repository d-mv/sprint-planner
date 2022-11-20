import { model, Schema } from 'mongoose';

import { Scenario } from './scenario.models';

const ScenarioSchema = new Schema<Scenario>(
  {
    label: { type: String, required: true, unique: true },
    stringified: { type: String, required: true },
  },
  { timestamps: true },
);

export const ScenarioCollection = model('scenario', ScenarioSchema);
