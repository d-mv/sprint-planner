import { Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { setupText } from '@mv-d/toolbelt';

import { TEXT } from '../../shared/data/text.data';

const TXT = setupText(TEXT)(['work']);

export function WorkNextSprintMessage() {
  return (
    <div id='work-next-sprint-message' className='center padding-1' style={{ width: '30rem' }}>
      <Typography variant='body1' color={deepOrange[500]}>
        {TXT('nextSprint')}
      </Typography>
    </div>
  );
}
