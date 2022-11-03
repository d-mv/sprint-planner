import { model, Schema } from 'mongoose';

import { AssignedWork, Work } from './work.models';

const WorkSchema = new Schema<Work>(
  {
    jiraTicket: { type: String, required: true, unique: true },
    jiraEpic: { type: String, default: '' },
    estimate: { type: Number, required: true, min: 1 },
    title: { type: String, required: true },
  },
  { timestamps: true },
);

export const WorkCollection = model('work', WorkSchema);

const AssignedWorkSchema = new Schema<AssignedWork>(
  {
    workId: { type: String, required: true },
    engineerId: { type: String, required: true },
    startDate: { type: Date, required: true },
  },
  { timestamps: true },
);

export const AssignedWorkCollection = model('assigned_work', AssignedWorkSchema);
