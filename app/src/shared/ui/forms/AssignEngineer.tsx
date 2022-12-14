import { MenuItem } from '@mui/material';
import { RecordObject, AnyValue, ifTrue } from '@mv-d/toolbelt';

import { useApp } from '../../../entities';
import { useSelector, getUnassignedEngineers, getScenarioByLabel, getIsLoading } from '../../../state';
import { FormContext, Form } from '../../lib';
import { DbEngineer } from '../../models';

interface Props {
  onClose: () => void;
}

export default function AssignEngineer({ onClose }: Props) {
  const { assignEngineer } = useApp();

  const unAssignedEngineers = useSelector(getUnassignedEngineers);

  const scenario = useSelector(getScenarioByLabel('assignEngineer'));

  const isLoading = useSelector(getIsLoading)('assign-engineer');

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    if (!isLoading) assignEngineer(form.engineerId, onClose);
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
        process: { submit: isLoading },
      }}
    >
      <Form />
    </FormContext.Provider>
  );
}
