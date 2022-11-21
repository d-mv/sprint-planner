import { Typography } from '@mui/material';
import { useContextSelector } from 'use-context-selector';

import { EngineerContext } from './engineer.contexts';
import { makeName } from './engineer.tools';

export function EngineerName() {
  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  return (
    <Typography className='w-100' variant='body1'>
      {makeName(engineer.person)}
    </Typography>
  );
}
