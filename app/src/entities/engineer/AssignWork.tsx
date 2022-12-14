import { R, AnyValue, dayjs, DayJS, ifTrue, Optional, RecordObject } from '@mv-d/toolbelt';
import { MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Form, FormContext, useUnassignedWorkIsOverSprint, DbWork } from '../../shared';
import {
  getIsLoading,
  getScenarioByLabel,
  getUnAssignedWorks,
  setMessage,
  useDispatch,
  useSelector,
} from '../../state';
import { EngineerContext } from './engineer.contexts';
import { useAssignedWork } from '../work/useAssignedWorks.hook';
import { WorkNextSprintMessage } from './WorkNextSprintMessage';

interface Props {
  onCancel: () => void;
}

export function AssignWork({ onCancel }: Props) {
  const engineerId = useContextSelector(EngineerContext, c => c.engineer._id);

  const unassignedWorks = useSelector(getUnAssignedWorks);

  const [selected, setSelected] = useState('');

  const [startDate, setStartDate] = useState<Optional<DayJS.Dayjs>>();

  const { add } = useAssignedWork();

  const [isOverSprint, setIsOverSprint] = useState(false);

  const checkIfIsOverSprint = useUnassignedWorkIsOverSprint();

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading)('add-assigned-work');

  const scenario = useSelector(getScenarioByLabel('assignWork'));

  useEffect(() => {
    setIsOverSprint(checkIfIsOverSprint(startDate, selected));
  }, [checkIfIsOverSprint, selected, startDate]);

  if (!scenario) return null;

  const getWorks = () => unassignedWorks;

  function renderWork(work: DbWork) {
    return (
      <MenuItem key={work._id} value={work._id}>
        {`${work.jiraTicket} (${work.estimate}) ${work.title}`}
      </MenuItem>
    );
  }

  function handleSubmit(form: RecordObject<AnyValue>) {
    if (!isLoading) add({ ...form, engineerId }, onCancel);
  }

  function handleError(message: string) {
    R.compose(dispatch, setMessage)(message);
  }

  function dateTrigger(v: string) {
    setStartDate(dayjs(v));
  }

  function workIdTrigger(v: string) {
    setSelected(v);
  }

  return (
    <FormContext.Provider
      value={{
        scenario,
        submitData: handleSubmit,
        onError: handleError,
        process: { submit: isLoading },
        actions: { cancel: onCancel },
        dataSources: {
          workId: getWorks,
        },
        renders: {
          workId: renderWork,
        },
        initial: {
          workId: unassignedWorks[0]._id,
        },
        components: {
          message: () => ifTrue(isOverSprint, () => <WorkNextSprintMessage />, <div style={{ width: '30rem' }} />),
        },
        triggers: {
          date: dateTrigger,
          workId: workIdTrigger,
        },
      }}
    >
      <Form />
    </FormContext.Provider>
  );
}
