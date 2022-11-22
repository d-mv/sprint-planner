import { ifTrue, mapI } from '@mv-d/toolbelt';
import { map } from 'ramda';
import { Fragment } from 'react';

import { DbWorkToRender, DbEngineer, CONSTANTS } from '../../shared';
import { getAssignedEngineers, getWorksForEngineer, useSelector } from '../../state';
import { SprintWorkDays } from './SprintWorkDays';

export function SprintWorks() {
  const engineers = useSelector(getAssignedEngineers);

  const works = useSelector(getWorksForEngineer);

  function renderAssignedWork(engineer: DbEngineer) {
    return function call(work: DbWorkToRender) {
      if (!work.work) return null;

      return <SprintWorkDays key={work._id} engineer={engineer} workToRender={work} />;
    };
  }

  function renderEngineerWorks(engineer: DbEngineer, index: number) {
    const w = works(engineer._id);

    return (
      <Fragment key={engineer._id}>
        <div
          className={ifTrue(!index, 'border-bottom', 'border-top border-bottom')}
          style={{ height: '4.2rem', backgroundColor: CONSTANTS.engineerLineColor }}
        />
        {ifTrue(w?.length, () => map(renderAssignedWork(engineer), w))}
      </Fragment>
    );
  }

  return (
    <div id='sprints-works' className='column w-fit'>
      {mapI(renderEngineerWorks, engineers)}
    </div>
  );
}
