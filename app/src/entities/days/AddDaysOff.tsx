import { Typography, Button, List, ListItemText, ListItem } from '@mui/material';
import { Dayjs } from 'dayjs';
import { map } from 'ramda';
import { useState } from 'react';

import { IconButton, Message } from '../../shared';
import { TEXT } from '../../data';
import { ifTrue, setupText } from '../../tools';
import { AddDayOff } from './AddDayOff';

const TXT = setupText(TEXT)('days');

interface Props {
  daysOff: Dayjs[];
  setDaysOff: (arg0: Dayjs[]) => void;
}

export function AddDaysOff({ daysOff, setDaysOff }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen(state => !state);
  }

  const renderAddDayOff = () => <AddDayOff daysOff={daysOff} setDaysOff={setDaysOff} onClose={toggleIsOpen} />;

  const renderMessage = () => <Message className='margin-center width-fit' message={TXT('noDaysOff')} />;

  function handleDelete(day: Dayjs) {
    return function click() {
      setDaysOff(daysOff.filter(d => !d.isSame(day, 'date')));
    };
  }

  function renderDay(day: Dayjs) {
    return (
      <ListItem
        key={day.toISOString()}
        style={{ width: '13rem' }}
        secondaryAction={<IconButton variant='delete' tooltip={TXT('remove')} onClick={handleDelete(day)} />}
      >
        <ListItemText primary={day.format('MMM D').toString()} />
      </ListItem>
    );
  }

  return (
    <div className='w-auto'>
      <div className='line s-between align-center' style={{ padding: '1rem 0 0 0' }}>
        <Typography variant='h6'>{TXT('daysOff')}</Typography>
        <Button variant='contained' size='small' onClick={toggleIsOpen}>
          {ifTrue(isOpen, TXT('cancel'), TXT('addDayOff'))}
        </Button>
      </div>
      <List className='column'>
        {map(renderDay, daysOff)}
        {ifTrue(!daysOff.length, renderMessage)}
        {ifTrue(isOpen, renderAddDayOff)}
      </List>
    </div>
  );
}
