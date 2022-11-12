import { Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Tooltip } from '../../../atoms';
import { ifTrue } from '../../../tools';
import { useWorkIsOverSprint } from '../../days';
import { WorkContext } from '../work.contexts';
import classes from './WorkLine.module.scss';

interface Props {
  className?: string;
}

export function WorkLine({ children, className }: PropsWithChildren<Props>) {
  const { work } = useContextSelector(WorkContext, c => c);

  const { jiraTicket, title } = work;

  const isOverSprint = useWorkIsOverSprint();

  const renderDescription = () => (
    <Typography variant='body1' className={clsx('w-100', classes.description)} color={ifTrue(isOverSprint, 'white')}>
      {title}
    </Typography>
  );

  function renderWithTooltip() {
    if (title.length > 60)
      return (
        <Tooltip message={title} withoutWrapper>
          {renderDescription()}
        </Tooltip>
      );

    return renderDescription();
  }

  return (
    <div
      className={clsx('line s-between align-center w-100', classes.container, className)}
      style={ifTrue(isOverSprint, { backgroundColor: deepOrange[500] })}
    >
      <Typography variant='body1' fontWeight={600}>
        <a href={`https://jira.healthcareit.net/browse/${jiraTicket}`} target='_blank' rel='noreferrer'>
          {jiraTicket}
        </a>
      </Typography>
      {renderWithTooltip()}
      {children}
    </div>
  );
}
