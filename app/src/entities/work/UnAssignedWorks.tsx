import { List, Typography } from '@mui/material';
import { map } from 'ramda';
import { CSSProperties, useEffect, useRef, useState } from 'react';

import { Divider } from '../../atoms';
import { MongoDocument } from '../../models';
import { useSelector, getUnAssignedWorks } from '../../state';
import { WorkContext } from './work.contexts';
import { Work } from './work.models';
import { WorkLine } from './WorkLine';

export function UnAssignedWorks() {
  const unAssignedWorks = useSelector(getUnAssignedWorks);

  const containerRef = useRef<HTMLDivElement | null>(null);

  function getHeight() {
    const sprints = document.getElementById('sprints');

    const sprintWorks = document.getElementById('sprints-works');

    if (!sprints || !sprintWorks) return 0;

    const window = globalThis.window.outerHeight;

    // eslint-disable-next-line no-console
    console.log(
      window,
      sprints.offsetHeight,
      sprintWorks.offsetHeight,
      window - sprints.offsetHeight - sprintWorks.offsetHeight - 100,
    );

    return (window - sprints.offsetHeight - sprintWorks.offsetHeight - 50 - 50 - 20) / 10;
  }

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) setHeight(getHeight());
  }, [containerRef.current]);

  if (!unAssignedWorks.length) return null;

  function renderWork(work: MongoDocument<Work>) {
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
    <div ref={containerRef} id='unassigned-works' className={'column border b-top-0'}>
      <Typography variant='h5' fontWeight={600} className='padding-1'>
        Unassigned Works
      </Typography>
      <Divider />
      <List style={getStyle()}>{map(renderWork, unAssignedWorks)}</List>
    </div>
  );
}
