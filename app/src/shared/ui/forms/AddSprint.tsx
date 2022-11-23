import { AnyValue, RecordObject } from '@mv-d/toolbelt';

import { useSprints } from '../../../entities';
import { useSelector, getScenarioByLabel } from '../../../state';
import { FormContext, Form } from '../../lib';

interface Props {
  onClose: () => void;
}

export function AddSprint({ onClose }: Props) {
  const { add } = useSprints();

  const scenario = useSelector(getScenarioByLabel('createSprint'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    add(form, onClose);
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
