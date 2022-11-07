import { List, Typography } from '@mui/material';
import { map } from 'ramda';

import { Divider } from '../../atoms';
import { MongoDocument } from '../../models';
import { useSelector, getUnAssignedWorks } from '../../state';
import { WorkContext } from './work.contexts';
import { Work } from './work.models';
import { WorkLine } from './WorkLine';

export function UnAssignedWorks() {
  const unAssignedWorks = useSelector(getUnAssignedWorks);

  if (!unAssignedWorks.length) return null;

  function renderWork(work: MongoDocument<Work>) {
    return (
      <WorkContext.Provider key={work._id} value={{ work }}>
        <WorkLine />
      </WorkContext.Provider>
    );
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
