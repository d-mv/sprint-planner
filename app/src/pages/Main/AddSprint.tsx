import { AnyValue, Dialog, Form, FormContext, LazyLoad, RecordObject } from '../../shared';
import { useSprints } from '../../entities/sprint/useSprints.hook';
import { getScenarioByLabel, useSelector } from '../../state';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export function AddSprint({ onClose, isOpen }: Props) {
  const { add } = useSprints();

  const scenario = useSelector(getScenarioByLabel('createSprint'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    add(form);
  }

  return (
    <Dialog onClose={onClose} isOpen={isOpen}>
      <LazyLoad>
        <FormContext.Provider
          value={{
            scenario,
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
