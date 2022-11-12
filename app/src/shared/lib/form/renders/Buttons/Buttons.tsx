import { Button } from '@mui/material';
import { map, path } from 'ramda';
import { useContextSelector } from 'use-context-selector';
import { Spinner } from '../../../../../atoms';
import { makeMatch, ifTrue } from '../../../../../tools';

// import { ButtonSize, PrimaryButton, SecondaryButton } from '../../../../components/Buttons';
// import { Spinner, SPINNERS } from '../../../../components/Loading';
import { FormContext } from '../../contexts';
import { FormButton } from '../../models';
import classes from './Buttons.module.scss';

const BUTTONS = makeMatch({ primary: Button, secondary: Button }, () => null);

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
    const action = actions ? actions[buttonItem.actionId] : () => {};

    const Button = BUTTONS[buttonItem.type];

    return (
      <Button
        id={buttonItem.actionId}
        // isBusy={isProcess(buttonItem)}
        className={ifTrue(isProcess(buttonItem), classes.processing)}
        // size={buttonItem.size ?? ButtonSize.MEDIUM}
        key={buttonItem.label}
        onClick={action}
        disabled={buttonItem.isDisabled}
        type={buttonItem.role ?? 'button'}
      >
        {renderContent(buttonItem)}
      </Button>
    );
  }

  return <div className={classes.container}>{map(renderButton, buttons)}</div>;
}
