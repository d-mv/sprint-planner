import { MenuItem } from '@mui/material';

import { AnyValue, DbEngineer, Form, FormContext, FormScenario, FormTypes, ifTrue, RecordObject } from '../../shared';
import { useApp } from '../../entities';
import { getScenarioByLabel, getUnassignedEngineers, useSelector } from '../../state';

const scenario: FormScenario = {
  _form: {
    style: {
      width: '40rem',
      paddingBlockStart: '1rem',
      paddingInline: '2rem',
    },
  },
  items: {
    engineerId: {
      order: 1,
      dataId: 'engineerId',
      label: 'Engineer',
      type: FormTypes.SELECTOR,
      autoFocus: true,
      isRequired: true,
      noValidation: true,
      style: { display: 'flex', width: '100%', justifyContent: 'space-between' },
      individualStyles: { label: { width: '10rem' } },
      missingDataMessage: 'No engineers to assign',
    },
  },
  buttons: [
    { label: 'Submit', type: 'primary', id: 'submit', role: 'submit', style: { minWidth: '9rem' } },
    { label: 'Cancel', variant: 'text', type: 'primary', id: 'cancel' },
  ],
};

interface Props {
  onClose: () => void;
}

export function AssignEngineer({ onClose }: Props) {
  const { assignEngineer } = useApp();

  const unAssignedEngineers = useSelector(getUnassignedEngineers);

  const scenario = useSelector(getScenarioByLabel('assignEngineer'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    assignEngineer(form.engineerId);
    onClose();
  }

  const getEngineers = () => unAssignedEngineers;

  function renderEngineer(engineer: DbEngineer) {
    return (
      <MenuItem key={engineer._id} value={engineer._id}>
        {`${engineer.person.lastName}, ${engineer.person.firstName}`}
      </MenuItem>
    );
  }

  return (
    <FormContext.Provider
      value={{
        scenario,
        submitData: handleSubmit,
        actions: {
          cancel: onClose,
        },
        renders: {
          engineerId: renderEngineer,
        },
        dataSources: {
          engineerId: getEngineers,
        },
        disabled: ifTrue(!unAssignedEngineers.length, ['submit']),
        initial: {
          engineerId: unAssignedEngineers[0]?._id,
        },
      }}
    >
      <Form />
    </FormContext.Provider>
  );
}
