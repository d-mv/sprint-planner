import {
  AuthController,
  EngineerController,
  failure,
  SprintController,
  WorkController,
  AssignedWorkController,
  AppController,
} from '../entities';
import { makeMatch } from '../tools';
import { GlobalController } from './global.controller';

export const QueryController = makeMatch(
  {
    auth: AuthController,
    sprint: SprintController,
    global: GlobalController,
    engineer: EngineerController,
    work: WorkController,
    assigned_work: AssignedWorkController,
    app: AppController,
  },
  () => failure('Domain is not found', 400),
);
