import { List, Typography } from '@mui/material';
import { map } from 'ramda';
import { CSSProperties, useEffect, useRef, useState } from 'react';

import { DbWork, Divider } from '../../shared';
import { useSelector, getUnAssignedWorks } from '../../state';
import { WorkContext } from '../work/work.contexts';
import { WorkLine } from '../work/WorkLine';

export function UnAssignedWorks() {
  const unAssignedWorks = useSelector(getUnAssignedWorks);

  const containerRef = useRef<HTMLDivElement | null>(null);

  function getHeight() {
    const sprints = document.getElementById('sprints');

    const sprintWorks = document.getElementById('sprints-works');

    if (!sprints || !sprintWorks) return 0;

    const window = globalThis.window.outerHeight;

    return (window - sprints.offsetHeight - sprintWorks.offsetHeight - 20) / 10;
  }

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) setHeight(getHeight());
  }, [containerRef.current]);

  if (!unAssignedWorks.length) return null;

  function renderWork(work: DbWork) {
    return (
      <WorkContext.Provider key={work._id} value={{ work }}>
        <WorkLine />
      </WorkContext.Provider>
    );
  }

  function getStyle(): CSSProperties {
    if (!height) return {};

    return { overflowY: 'scroll', height: `${height}rem` };
  }

  return (
    <div ref={containerRef} id='unassigned-works' className={'column  w-fit b-right-0'}>
      <Typography variant='h5' fontWeight={600} className='padding-1'>
        Unassigned Works
      </Typography>
      <Divider />
      <List style={getStyle()}>{map(renderWork, unAssignedWorks)}</List>
    </div>
  );
}
