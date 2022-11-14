import { Button } from '@mui/material';
import { map, path } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { Spinner } from '../../../../ui/atoms';
import { ifTrue, makeMatch } from '../../../../../tools';
import { FormContext, FormInternalContext } from '../../contexts';
import { FormButton } from '../../models';
import classes from './Buttons.module.scss';

const SPINNER_COLOR = makeMatch(
  {
    primary: classes['spin-light'],
  },
  '',
);

export function Buttons() {
  const [buttons, actions, process] = useContextSelector(FormContext, c => [c.scenario.buttons, c.actions, c.process]);

  const statuses = useContextSelector(FormInternalContext, c => c.statuses);

  const isProcessingPresent = process !== undefined;

  const isProcess = (buttonItem: FormButton) => Boolean(path([buttonItem.id], process));

  function getStatus(id: string, status: string): boolean {
    if (!statuses) return false;

    const key = `${id}-${status}`;

    if (!(key in statuses)) return false;

    return statuses[key];
  }

  function renderContent(buttonItem: FormButton) {
    // eslint-disable-next-line no-console
    console.log(!isProcessingPresent, !isProcess(buttonItem));

    if (!isProcessingPresent || !isProcess(buttonItem)) return buttonItem.label;

    // eslint-disable-next-line no-console
    console.log(buttonItem.type, buttonItem.isDisabled);

    if (isProcess(buttonItem)) {
      const buttonIsDisabled = buttonItem.isDisabled ?? getStatus(buttonItem.id, 'disabled');

      return (
        <div className={classes.some}>
          <Spinner className={buttonIsDisabled ? classes['spin-dark'] : SPINNER_COLOR[buttonItem.type]} />
        </div>
      );
    }

    return buttonItem.label;
  }

  function renderButton(buttonItem: FormButton) {
    // eslint-disable-next-line no-useless-return, @typescript-eslint/no-empty-function
    let action = () => {};

    if (buttonItem.role !== 'submit' && actions) action = actions[buttonItem.id];

    // eslint-disable-next-line no-console
    console.log(buttonItem.style);
    return (
      <Button
        key={buttonItem.label}
        onClick={action}
        type={ifTrue(!actions, 'submit')}
        disabled={buttonItem.isDisabled ?? getStatus(buttonItem.id, 'disabled')}
        className={ifTrue(isProcess(buttonItem), classes.processing)}
        variant={buttonItem.variant ?? 'contained'}
        size={buttonItem.size ?? 'medium'}
        color={buttonItem.type}
        style={buttonItem.style}
      >
        {renderContent(buttonItem)}
      </Button>
    );
  }

  return <div className={classes.container}>{map(renderButton, buttons)}</div>;
}
