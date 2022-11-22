import { Popover } from '@mui/material';
import { clsx } from 'clsx';
import { Dayjs } from 'dayjs';
import { Optional, R } from '@mv-d/toolbelt';
import { MouseEvent, useState } from 'react';

import { MongoDocument, CONSTANTS, DayPopup, useWorkDays, DbEngineer } from '../../shared';
import { DayType } from '../days';
import { Day } from '../days/Day';
import { useEngineers } from '../engineer';
import { WorkToRender } from '../work';

interface Props {
  workToRender: WorkToRender;
  engineer: DbEngineer;
}

export function SprintWorkDays({ workToRender, engineer }: Props) {
  const { days } = useWorkDays({ engineer, workToRender });

  const [day, setDay] = useState<Optional<Dayjs>>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { update } = useEngineers();

  const [isChecked, setIsChecked] = useState(false);

  const open = Boolean(anchorEl);

  function handleClick(date: Dayjs) {
    return function call(event: MouseEvent<HTMLButtonElement>) {
      const isEngineerDayOff = Boolean(engineer.daysOff.find(d => d.isSame(date, 'date')));

      setDay(date);
      setIsChecked(isEngineerDayOff);
      setAnchorEl(event.currentTarget);
    };
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleChange(v: boolean) {
    if (day) {
      let daysOff = engineer.daysOff;

      if (v) daysOff.push(day);
      else daysOff = daysOff.filter(d => !d.isSame(day, 'date'));

      update({ ...engineer, daysOff }, handleClose);
    }
  }

  function renderWorkDay(day: MongoDocument<DayType>) {
    return <Day key={day._id} day={day} onClick={handleClick} />;
  }

  return (
    <div className={clsx('align-center w-fit')} style={{ height: CONSTANTS.daysLineHeight }}>
      {R.map(renderWorkDay, days)}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <DayPopup onChange={handleChange} isChecked={isChecked} />
      </Popover>
    </div>
  );
}
