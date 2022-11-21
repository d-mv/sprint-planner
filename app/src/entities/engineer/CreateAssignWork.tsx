import { compose, path } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AnyValue, RecordObject, Form, FormContext } from '../../shared';
import { getIsLoading, getScenarioByLabel, setMessage, useDispatch, useSelector } from '../../state';
import { EngineerContext } from './engineer.contexts';
import { useWorks } from '../work/useWorks.hook';

interface Props {
  onCancel: () => void;
}

export function CreateAssignWork({ onCancel }: Props) {
  const engineerId = useContextSelector(EngineerContext, c => c.engineer._id);

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);

  const { add } = useWorks();

  const scenario = useSelector(getScenarioByLabel('createWork'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    const startDate = String(path(['startDate'], form));

    add(form, { engineerId, startDate }, onCancel);
  }

  function handleError(message: string) {
    compose(dispatch, setMessage)(message);
  }

  return (
    <FormContext.Provider
      value={{
        scenario,
        submitData: handleSubmit,
        onError: handleError,
        process: { submit: isLoading('add-work') },
        actions: { cancel: onCancel },
      }}
    >
      <Form />
    </FormContext.Provider>
  );
}
