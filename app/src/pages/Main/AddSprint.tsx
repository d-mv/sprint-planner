import { AnyValue, Form, FormContext, RecordObject } from '../../shared';
import { useSprints } from '../../entities/sprint/useSprints.hook';
import { getScenarioByLabel, useSelector } from '../../state';

interface Props {
  onClose: () => void;
}

export function AddSprint({ onClose }: Props) {
  const { add } = useSprints();

  const scenario = useSelector(getScenarioByLabel('createSprint'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    add(form);
  }

  return (
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
  );
}
