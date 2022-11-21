import { Dayjs } from 'dayjs';
import { compose, map } from 'ramda';
import { MouseEvent, useState } from 'react';

import { Sprint } from '.';
import { Day } from '../days/Day';
import { DayType } from '../days/days.models';
import { Popover } from '@mui/material';
import { DayPopup, MongoDocument, Option } from '../../shared';
import { addRemoveDayOff, getIsDayOff, useDispatch, useSelector } from '../../state';

interface Props {
  sprint: Sprint;
}

export function Days({ sprint }: Props) {
  const [day, setDay] = useState<Option<Dayjs>>(null);

  const dispatch = useDispatch();

  const isDayOff = useSelector(getIsDayOff);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  const isChecked = isDayOff(day);

  function handleClick(date: Dayjs) {
    return function call(event: MouseEvent<HTMLButtonElement>) {
      setDay(date);
      setAnchorEl(event.currentTarget);
    };
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleChange() {
    if (day) compose(dispatch, addRemoveDayOff)(day);

    handleClose();
  }

  function renderCell(day: MongoDocument<DayType>) {
    return <Day withDate key={day._id} day={day} onClick={handleClick} />;
  }

  return (
    <div className='line'>
      {map(renderCell, sprint.days)}
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
