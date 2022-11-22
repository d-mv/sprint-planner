import { makeMatch, negativeResponse } from '@mv-d/toolbelt';

import {
  AuthController,
  EngineerController,
  SprintController,
  WorkController,
  AssignedWorkController,
  AppController,
  ScenarioController,
} from '../entities';
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
    scenario: ScenarioController,
  },
  () => negativeResponse('Domain is not found', 400),
);
