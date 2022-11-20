import { AnyValue, Dialog, Form, FormContext, LazyLoad, RecordObject } from '../../shared';
import { createSprintScenario } from '../../entities/sprint/createSprint.scenario';
import { useSprints } from '../../entities/sprint/useSprints.hook';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export function AddEngineer({ onClose, isOpen }: Props) {
  const { add } = useSprints();

  function handleSubmit(form: RecordObject<AnyValue>) {
    add(form);
  }

  return (
    <Dialog onClose={onClose} isOpen={isOpen}>
      <LazyLoad>
        <FormContext.Provider
          value={{
            scenario: createSprintScenario,
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
