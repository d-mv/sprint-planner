import { Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { clsx } from 'clsx';
import { PropsWithChildren } from 'react';
import { useContextSelector } from 'use-context-selector';

import { ChipWithTooltip, Tooltip } from '../../../shared';
import { ifTrue } from '../../../shared';
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

  function renderChip() {
    return <Typography variant='body2'>{work.estimate}</Typography>;
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
      <ChipWithTooltip tooltip='Estimate points' label={renderChip()} color='default' style={{ padding: '0 1rem' }} />
      {renderWithTooltip()}
      {children}
    </div>
  );
}
