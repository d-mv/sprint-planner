import { Button } from '@mui/material';
import { map, path } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { Spinner } from '../../../../../atoms';
import { ifTrue } from '../../../../../tools';
import { FormContext } from '../../contexts';
import { FormButton } from '../../models';
import classes from './Buttons.module.scss';

export function Buttons() {
  const [buttons, actions, process] = useContextSelector(FormContext, c => [c.scenario.buttons, c.actions, c.process]);

  const isProcessingPresent = process !== undefined;

  const isProcess = (buttonItem: FormButton) => Boolean(path([buttonItem.actionId], process));

  function renderContent(buttonItem: FormButton) {
    if (!isProcessingPresent || !isProcess(buttonItem)) return buttonItem.label;

    if (isProcess(buttonItem))
      return (
        <div className={classes.some}>
          <Spinner />
          <span className={classes['transparent-label']}>{buttonItem.label}</span>
        </div>
      );

    return buttonItem.label;
  }

  function renderButton(buttonItem: FormButton) {
    // eslint-disable-next-line no-useless-return, @typescript-eslint/no-empty-function
    let action = () => {};

    if (buttonItem.role !== 'submit' && actions) action = actions[buttonItem.actionId];

    return (
      <Button
        key={buttonItem.label}
        onClick={action}
        type={ifTrue(!actions, 'submit')}
        disabled={buttonItem.isDisabled}
        className={ifTrue(isProcess(buttonItem), classes.processing)}
        variant={buttonItem.variant ?? 'contained'}
        size={buttonItem.size ?? 'medium'}
        color={buttonItem.type}
      >
        {renderContent(buttonItem)}
      </Button>
    );
  }

  return <div className={classes.container}>{map(renderButton, buttons)}</div>;
}
