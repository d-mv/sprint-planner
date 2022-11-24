import { AnyValue, RecordObject } from '@mv-d/toolbelt';

import { useSprints } from '../../../entities';
import { useSelector, getScenarioByLabel, getIsLoading } from '../../../state';
import { FormContext, Form } from '../../lib';

interface Props {
  onClose: () => void;
}

export default function AddSprint({ onClose }: Props) {
  const { add } = useSprints();

  const isLoading = useSelector(getIsLoading)('add-sprint');

  const scenario = useSelector(getScenarioByLabel('createSprint'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    if (isLoading) add(form, onClose);
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
          submit: isLoading,
        },
      }}
    >
      <Form />
    </FormContext.Provider>
  );
}
