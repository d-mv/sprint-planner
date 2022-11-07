import { Typography } from '@mui/material';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Tooltip } from '../../../atoms';
import { WorkContext } from '../work.contexts';
import classes from './WorkLine.module.scss';

interface Props {
  className?: string;
}

export function WorkLine({ children, className }: PropsWithChildren<Props>) {
  const { jiraTicket, title } = useContextSelector(WorkContext, c => c.work);

  const renderDescription = () => (
    <Typography variant='body1' className={classes.description}>
      {title}
    </Typography>
  );

  function renderWithTooltip() {
    if (title.length > 60) return <Tooltip message={title}>{renderDescription()}</Tooltip>;

    return renderDescription();
  }

  return (
    <div className={clsx(classes.container, className)}>
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
