import clsx from 'clsx';
import { map } from 'ramda';
import { MongoDocument } from '../../models';
import { CONSTANTS } from '../../theme';
import { DayType, useWorkDays, WorkDay } from '../days';
import { Engineer } from '../engineer';
import { WorkToRender } from '../work';

interface Props {
  workToRender: WorkToRender;
  engineer: Engineer;
}

export function SprintWorkDays({ workToRender, engineer }: Props) {
  const { days } = useWorkDays({ engineer, workToRender });

  function renderWorkDay(day: MongoDocument<DayType>) {
    return <WorkDay key={day._id} day={day} />;
  }

  return (
    <div className={clsx('align-center w-fit')} style={{ height: CONSTANTS.daysLineHeight }}>
      {map(renderWorkDay, days)}
    </div>
  );
}
