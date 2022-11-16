import { map } from 'ramda';
import { Fragment } from 'react';

import { MongoDocument, DbWorkToRender, mapWithIndex } from '../../shared';
import { getAddedEngineers, getWorksForEngineer, useSelector } from '../../state';
import { CONSTANTS } from '../../shared';
import { ifTrue } from '../../shared';
import { Engineer } from '../engineer';
import { SprintWorkDays } from './SprintWorkDays';

export function SprintWorks() {
  const engineers = useSelector(getAddedEngineers);

  const works = useSelector(getWorksForEngineer);

  function renderAssignedWork(engineer: Engineer) {
    return function call(work: DbWorkToRender) {
      if (!work.work) return null;

      return <SprintWorkDays key={work._id} engineer={engineer} workToRender={work} />;
    };
  }

  function renderEngineerWorks(engineer: MongoDocument<Engineer>, index: number) {
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
      {mapWithIndex(renderEngineerWorks, engineers)}
    </div>
  );
}
