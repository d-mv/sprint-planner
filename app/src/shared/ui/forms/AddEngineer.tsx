import { RecordObject, AnyValue } from '@mv-d/toolbelt';

import { Form, FormContext } from '../..';
import { makeNewEngineerObject, useEngineers } from '../../../entities';
import { getIsLoading, getScenarioByLabel, useSelector } from '../../../state';

interface Props {
  onClose: () => void;
}

export function AddEngineer({ onClose }: Props) {
  const isLoading = useSelector(getIsLoading);

  const { add } = useEngineers();

  const scenario = useSelector(getScenarioByLabel('createEngineer'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    add(makeNewEngineerObject(form), onClose);
  }

  return (
    <FormContext.Provider
      value={{
        scenario,
        submitData: handleSubmit,
        actions: {
          cancel: onClose,
        },
        process: {
          submit: isLoading('add-engineer'),
        },
      }}
    >
      <Form />
    </FormContext.Provider>
  );
}
