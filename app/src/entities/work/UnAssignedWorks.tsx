import { List, Typography } from '@mui/material';
import { map } from 'ramda';

import { Divider } from '../../atoms';
import { useSelector, getUnAssignedWorks } from '../../state';
import { Work } from './work.models';
import { WorkLine } from './WorkLine';

export function UnAssignedWorks() {
  const unAssignedWorks = useSelector(getUnAssignedWorks);

  if (!unAssignedWorks.length) return null;

  function renderWork(work: Work) {
    return <WorkLine key={work.id} work={work} />;
  }

  return (
    <div className={'column border b-top-0'}>
      <Typography variant='h5' fontWeight={600} className='padding-1'>
        Unassigned Works
      </Typography>
      <Divider />
      <List>{map(renderWork, unAssignedWorks)}</List>
    </div>
  );
}
