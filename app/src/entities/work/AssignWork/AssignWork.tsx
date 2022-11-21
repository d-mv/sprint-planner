import { MenuItem } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { compose } from 'ramda';
import { useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { AnyValue, MongoDocument, Option, RecordObject, Form, FormContext, LazyLoad, ifTrue } from '../../../shared';
import {
  getIsLoading,
  getScenarioByLabel,
  getUnAssignedWorks,
  setMessage,
  useDispatch,
  useSelector,
} from '../../../state';
import { useUnassignedWorkIsOverSprint } from '../../days';
import { EngineerContext } from '../../engineer/engineer.contexts';
import { useAssignedWork } from '../useAssignedWorks.hook';
import { Work } from '../work.models';
import { WorkNextSprintMessage } from '../WorkNextSprintMessage';
import classes from './AssignWork.module.scss';

interface Props {
  onCancel: () => void;
}

export function AssignWork({ onCancel }: Props) {
  const engineerId = useContextSelector(EngineerContext, c => c.engineer._id);

  const unassignedWorks = useSelector(getUnAssignedWorks);

  const [selected, setSelected] = useState('');

  const [startDate, setStartDate] = useState<Option<Dayjs>>();

  const { add } = useAssignedWork();

  const [isOverSprint, setIsOverSprint] = useState(false);

  const checkIfIsOverSprint = useUnassignedWorkIsOverSprint();

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading)('add-assigned-work');

  const scenario = useSelector(getScenarioByLabel('createWork'));

  useEffect(() => {
    setIsOverSprint(checkIfIsOverSprint(startDate, selected));
  }, [checkIfIsOverSprint, selected, startDate]);

  if (!scenario) return null;

  const getWorks = () => unassignedWorks;

  function renderWork(work: MongoDocument<Work>) {
    return (
      <MenuItem key={work._id} value={work._id}>
        {`${work.jiraTicket} (${work.estimate}) ${work.title}`}
      </MenuItem>
    );
  }

  function handleSubmit(form: RecordObject<AnyValue>) {
    add({ ...form, engineerId }, onCancel);
  }

  function handleError(message: string) {
    compose(dispatch, setMessage)(message);
  }

  function dateTrigger(v: string) {
    setStartDate(dayjs(v));
  }

  function workIdTrigger(v: string) {
    setSelected(v);
  }

  return (
    <div className={classes.container}>
      <LazyLoad>
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
      </LazyLoad>
    </div>
  );
}
