import { Button } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { TEXT } from '../../shared';
import { setupText } from '../../shared';
import { AddDaysOff } from '../days';
import { EngineerContext } from './engineer.contexts';
import { useEngineers } from './useEngineers.hook';

const TXT = setupText(TEXT)('engineer');

interface Props {
  onClose: () => void;
}

export function EngineerDaysOff({ onClose }: Props) {
  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const [daysOff, setDaysOff] = useState<Dayjs[]>(engineer.daysOff);

  const [isDaysOffUpdated, setDaysOffUpdated] = useState(false);

  const { update } = useEngineers();

  function handleUpdate() {
    onClose();
    setDaysOffUpdated(false);
    update({ ...engineer, daysOff });
  }

  function handleSetDaysOff(days: Dayjs[]) {
    setDaysOff(days);
    setDaysOffUpdated(true);
  }

  return (
    <div id='engineer-days-off' className='padding-1'>
      <AddDaysOff daysOff={daysOff} setDaysOff={handleSetDaysOff} />
      <div className='w-100 center padding-1'>
        <Button variant='contained' size='small' disabled={!isDaysOffUpdated} onClick={handleUpdate}>
          {TXT('update')}
        </Button>
      </div>
    </div>
  );
}
