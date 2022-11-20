import { AnyValue, Dialog, Form, FormContext, LazyLoad, RecordObject } from '../../shared';
import { useSprints } from '../../entities/sprint/useSprints.hook';
import { createEngineerScenario } from '../../entities/engineer/createEngineer.scenario';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export function CreateEngineer({ onClose, isOpen }: Props) {
  const { add } = useSprints();

  function handleSubmit(form: RecordObject<AnyValue>) {
    add(form);
  }

  return (
    <Dialog onClose={onClose} isOpen={isOpen}>
      <LazyLoad>
        <FormContext.Provider
          value={{
            scenario: createEngineerScenario,
            submitData: handleSubmit,
            actions: {
              cancel: onClose,
            },
          }}
        >
          <Form />
        </FormContext.Provider>
      </LazyLoad>
    </Dialog>
  );
}
