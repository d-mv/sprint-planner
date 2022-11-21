import { useTheme } from '@emotion/react';
import { Collapse, Typography } from '@mui/material';
import { clsx } from 'clsx';
import { path } from 'ramda';

import { makeMatch } from '../../shared/tools/object.tools';
import { getAllIsLoading, LoadingActions, useSelector } from '../../state';
import classes from './Loading.module.scss';

const MESSAGES = makeMatch(
  {
    [LoadingActions.GET_ASSIGNED_ENGINEERS]: 'assigned engineers',
    [LoadingActions.GET_ASSIGNED_WORK]: 'assigned works',
    [LoadingActions.GET_ENGINEERS]: 'engineers',
    [LoadingActions.GET_SPRINT]: 'sprints',
    [LoadingActions.GET_WORKS]: 'works',
    [LoadingActions.GET_LOGIN]: 'DB',
    [LoadingActions.GET_SCENARIOS]: 'scenarios',
  },
  '',
);

export function Loading() {
  const theme = useTheme();

  const isLoading = useSelector(getAllIsLoading);

  const item = Object.entries(isLoading).filter(el => Boolean(el[1]))[0];

  const filtered = item ? MESSAGES[item[0]] : '';

  if (!filtered) return null;

  return (
    <Collapse orientation='vertical' in={Boolean(filtered)}>
      <div className={clsx('center', classes.container)}>
        <div className={clsx('border center', classes.dialog)} style={{ boxShadow: path(['shadows', 9], theme) }}>
          <Typography variant='body1'>{`Loading${filtered ? ' ' + filtered : ''}...`}</Typography>
        </div>
      </div>
    </Collapse>
  );
}
