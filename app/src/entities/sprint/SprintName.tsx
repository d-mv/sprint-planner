import { Typography } from '@mui/material';
import dayjs from 'dayjs';

import { MongoDocument, checkIfBetween, getWorkingDaysDiff } from '../../shared';
import { Sprint } from './sprint.models';

interface Props {
  sprint: MongoDocument<Sprint>;
}

export function SprintName({ sprint }: Props) {
  const isBetween = checkIfBetween(dayjs(), sprint.startDate, sprint.endDate);

  function makeString(): string {
    if (!isBetween) return sprint.name;

    const hasLeft = `${getWorkingDaysDiff(dayjs(), sprint.endDate)}`;

    return `${sprint.name}, ${hasLeft} days left`;
  }

  return (
    <div className='center margin-center w-100' style={{ padding: '.5rem 0' }}>
      <Typography variant='body1'>{makeString()}</Typography>
    </div>
  );
}
