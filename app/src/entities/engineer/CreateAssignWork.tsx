import { AnyValue, R, RecordObject } from '@mv-d/toolbelt';
import { useContextSelector } from 'use-context-selector';

import { Form, FormContext } from '../../shared';
import { getIsLoading, getScenarioByLabel, setMessage, useDispatch, useSelector } from '../../state';
import { EngineerContext } from './engineer.contexts';
import { useWorks } from '../work/useWorks.hook';

interface Props {
  onCancel: () => void;
}

export function CreateAssignWork({ onCancel }: Props) {
  const engineerId = useContextSelector(EngineerContext, c => c.engineer._id);

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading)('add-work');

  const { add } = useWorks();

  const scenario = useSelector(getScenarioByLabel('createWork'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    if (isLoading) return;

    const startDate = String(R.path(['startDate'], form));

    add(form, { engineerId, startDate }, onCancel);
  }

  function handleError(message: string) {
    R.compose(dispatch, setMessage)(message);
  }

  return (
    <FormContext.Provider
      value={{
        scenario,
        submitData: handleSubmit,
        onError: handleError,
        process: { submit: isLoading },
        actions: { cancel: onCancel },
      }}
    >
      <Form />
    </FormContext.Provider>
  );
}
