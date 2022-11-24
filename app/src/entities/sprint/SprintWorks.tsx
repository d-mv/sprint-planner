import { Collapse } from '@mui/material';
import { ifTrue, R } from '@mv-d/toolbelt';
import { Fragment, useEffect, useState } from 'react';

import { DbWorkToRender, DbEngineer } from '../../shared';
import {
  getAssignedEngineers,
  getHeightMultiplierForSprintWorks,
  getIsEngineerUnfolded,
  getWorksForEngineer,
  useSelector,
} from '../../state';
import { SprintWorkDays } from './SprintWorkDays';

export function SprintWorks() {
  const engineers = useSelector(getAssignedEngineers);

  const getWorks = useSelector(getWorksForEngineer);

  const checkUnfolded = useSelector(getIsEngineerUnfolded);

  const checkBeforeMe = useSelector(getHeightMultiplierForSprintWorks);

  function renderAssignedWork(engineer: DbEngineer) {
    return function call(work: DbWorkToRender) {
      if (!work.work) return null;

      return <SprintWorkDays key={work._id} engineer={engineer} workToRender={work} />;
    };
  }

  function renderEngineerWorks(engineer: DbEngineer) {
    const works = getWorks(engineer._id);

    const isUnfolded = checkUnfolded(engineer._id);

    const heightM = checkBeforeMe(engineer._id);

    return (
      <Collapse key={engineer._id} in={isUnfolded}>
        <div style={{ height: `${4 * heightM}rem` }} />
        {ifTrue(works?.length, () => R.map(renderAssignedWork(engineer), works))}
      </Collapse>
    );
  }

  return (
    <div id='sprints-works' className='column w-fit'>
      {R.map(renderEngineerWorks, engineers)}
    </div>
  );
}
