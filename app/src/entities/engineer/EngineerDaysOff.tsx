import { RecordObject, AnyValue } from '@mv-d/toolbelt';
import { useContextSelector } from 'use-context-selector';

import { EngineerContext } from './engineer.contexts';
import { useEngineers } from '../../shared/hooks/useEngineers.hook';
import { Container, Form, format, FormContext } from '../../shared';
import { getIsLoading, getScenarioByLabel, useSelector } from '../../state';

interface Props {
  onClose: () => void;
}

export function EngineerDaysOff({ onClose }: Props) {
  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const isLoading = useSelector(getIsLoading);

  const { update } = useEngineers();

  const scenario = useSelector(getScenarioByLabel('engineerDaysOff'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    const daysOff = Array.from(new Set(form['daysOff']));

    update({ _id: engineer._id, daysOff }, onClose);
  }

  return (
    <Container>
      <FormContext.Provider
        value={{
          scenario,
          submitData: handleSubmit,
          process: { submit: isLoading('update-engineer') },
          actions: { cancel: onClose },
          initial: {
            daysOff: engineer.daysOff.map(format()),
          },
        }}
      >
        <Form />
      </FormContext.Provider>
    </Container>
  );
}
