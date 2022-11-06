import { Button } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useEngineers } from '../../adaptors';

import { TEXT } from '../../data';
import { MongoDocument } from '../../models';
import { setupText } from '../../tools';
import { AddDaysOff } from '../days';
import { Engineer } from './engineer.models';

const TXT = setupText(TEXT)('engineer');

interface Props {
  engineer: MongoDocument<Engineer>;
  onClose: () => void;
}

export function EngineerDaysOff({ engineer, onClose }: Props) {
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
