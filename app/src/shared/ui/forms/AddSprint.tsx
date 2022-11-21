import { useSprints } from '../../../entities';
import { useSelector, getScenarioByLabel } from '../../../state';
import { FormContext, Form } from '../../lib';
import { RecordObject, AnyValue } from '../../models';

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
