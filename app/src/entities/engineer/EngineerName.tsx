import { R } from '@mv-d/toolbelt';
import { Typography } from '@mui/material';
import { useContextSelector } from 'use-context-selector';
import { getWorksForEngineer, unfoldEngineer, useDispatch, useSelector } from '../../state';

import { EngineerContext } from './engineer.contexts';
import { makeName, makeWorksQty } from './engineer.tools';

export function EngineerName() {
  const dispatch = useDispatch();

  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const works = useSelector(getWorksForEngineer)(engineer._id);

  function handleClick() {
    R.compose(dispatch, unfoldEngineer)(engineer._id);
  }

  return (
    <div
      className='line w-100 a-center'
      onClick={handleClick}
      style={{ cursor: works.length ? 'pointer' : 'not-allowed' }}
    >
      <Typography variant='body1'>{makeName(engineer.person)}</Typography>
      <Typography variant='body2' color='info' style={{ marginInlineStart: '1.5rem' }}>
        {makeWorksQty(works?.length ?? 0)}
      </Typography>
    </div>
  );
}
