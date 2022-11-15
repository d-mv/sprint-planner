import { Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

import { TEXT } from '../../data';
import { setupText } from '../../tools';

const TXT = setupText(TEXT)(['work']);

export function WorkNextSprintMessage() {
  return (
    <div className='center padding-1' style={{ width: '30rem' }}>
      <Typography variant='body1' color={deepOrange[500]}>
        {TXT('nextSprint')}
      </Typography>
    </div>
  );
}
