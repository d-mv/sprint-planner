import { AnyValue, Form, FormContext, RecordObject } from '../../shared';
import { createEngineerScenario } from '../../entities/engineer/createEngineer.scenario';
import { makeNewEngineerObject, useEngineers } from '../../entities';
import { getIsLoading, useSelector } from '../../state';

interface Props {
  onClose: () => void;
}

export function AddEngineer({ onClose }: Props) {
  const isLoading = useSelector(getIsLoading);

  const { add } = useEngineers();

  function handleSubmit(form: RecordObject<AnyValue>) {
    add(makeNewEngineerObject(form));
    onClose();
  }

  return (
    <FormContext.Provider
      value={{
        scenario: createEngineerScenario,
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
