import { useTheme } from '@emotion/react';
import { Collapse, Typography } from '@mui/material';
import clsx from 'clsx';
import { map, path } from 'ramda';

import { getAllIsLoading, LoadingActions, useSelector } from '../../state';
import { makeMatch } from '../../tools';
import classes from './Loading.module.scss';

const MESSAGES = makeMatch(
  {
    [LoadingActions.GET_ADDED_ENGINEERS]: 'added engineers',
    [LoadingActions.GET_ASSIGNED_WORK]: 'assigned works',
    [LoadingActions.GET_ENGINEERS]: 'engineers',
    [LoadingActions.GET_SPRINT]: 'sprints',
    [LoadingActions.GET_WORKS]: 'works',
    [LoadingActions.GET_LOGIN]: 'accessing DB',
  },
  '',
);

export function Loading() {
  const theme = useTheme();

  const isLoading = useSelector(getAllIsLoading);

  const filtered = Object.entries(isLoading)
    .filter(el => Boolean(el[1]))
    .map(el => MESSAGES[el[0]]);

  function renderElement(s: string) {
    return <Typography variant='body1' key={s}>{`- ${s}...`}</Typography>;
  }

  if (!filtered.length || (filtered.length === 1 && filtered[0] === '')) return null;

  return (
    <Collapse orientation='vertical' in={Boolean(filtered.length)}>
      <div className={clsx('center', classes.container)}>
        <div className={clsx('border center', classes.dialog)} style={{ boxShadow: path(['shadows', 9], theme) }}>
          <Typography variant='h5' fontWeight={600} className='m-vertical'>
            Loading:
          </Typography>
          <div className={classes.list}>{map(renderElement, filtered)}</div>
        </div>
      </div>
    </Collapse>
  );
}
