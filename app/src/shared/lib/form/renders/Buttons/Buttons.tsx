import { Button } from '@mui/material';
import { map, path, pick } from 'ramda';

import { useContextSelector } from 'use-context-selector';
import { ifTrue } from '../../../../tools/logic.tools';
import { makeMatch } from '../../../../tools/object.tools';
import { Divider, Spinner } from '../../../../ui/atoms';
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
  const { scenario, actions, process, disabled } = useContextSelector(FormContext, c =>
    pick(['scenario', 'actions', 'process', 'disabled'], c),
  );

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
    if (!isProcessingPresent || !isProcess(buttonItem)) return buttonItem.label;

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
    let noAction = true;

    if (buttonItem.role !== 'submit' && actions) {
      action = actions[buttonItem.id];
      noAction = false;
    }

    return (
      <Button
        key={buttonItem.label}
        onClick={action}
        type={ifTrue(noAction, 'submit')}
        disabled={buttonItem.isDisabled ?? disabled?.includes(buttonItem.id) ?? getStatus(buttonItem.id, 'disabled')}
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

  return (
    <div>
      <Divider width='100%' />
      <div className={classes.container}>{map(renderButton, scenario.buttons)}</div>
    </div>
  );
}
