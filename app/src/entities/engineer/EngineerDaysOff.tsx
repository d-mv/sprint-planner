import { useContextSelector } from 'use-context-selector';

import { EngineerContext } from './engineer.contexts';
import { useEngineers } from '../../shared/hooks/useEngineers.hook';
import { AnyValue, Container, Form, format, FormContext, FormScenario, FormTypes, RecordObject } from '../../shared';
import { getIsLoading, useSelector } from '../../state';

const scenario: FormScenario = {
  id: 'engineerDaysOff',
  _form: {
    style: { width: '95%', margin: '0 auto' },
  },
  items: {
    daysOff: {
      order: 1,
      dataId: 'daysOff',
      label: 'Days Off',
      type: FormTypes.DATE_SET,
      defaultValue: 'current',
      buttons: [{ id: 'primary', label: 'Add Day Off' }],
      individualStyles: {
        input: {
          maxWidth: '20rem',
          margin: '0 auto',
        },
        error: {
          textAlign: 'center',
          marginInlineStart: 'calc(50% - 8rem)',
          width: 'fit-content',
        },
      },
    },
  },
  buttons: [
    { label: 'Submit', type: 'primary', id: 'submit', role: 'submit' },
    { label: 'Cancel', variant: 'text', type: 'secondary', id: 'cancel' },
  ],
};

interface Props {
  onClose: () => void;
}

export function EngineerDaysOff({ onClose }: Props) {
  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const isLoading = useSelector(getIsLoading);

  const { update } = useEngineers();

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
