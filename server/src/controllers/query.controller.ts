import { AuthController, failure, SprintController } from '../entities';
import { makeMatch } from '../tools';

export const QueryController = makeMatch(
  {
    auth: AuthController,
    sprint: SprintController,
  },
  () => failure('Domain is not found', 400),
);
