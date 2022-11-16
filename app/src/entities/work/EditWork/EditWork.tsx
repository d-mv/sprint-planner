import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { assoc, compose, o, omit, path, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AnyValue, RecordObject } from '../../../models';
import { Form, FormContext, LazyLoad } from '../../../shared';
import { getIsLoading, setMessage, useDispatch, useSelector } from '../../../state';
import { EngineerContext } from '../../engineer/engineer.contexts';
import { createWorkFormScenario } from '../createWork.scenario';
import { useWorks } from '../useWorks.hook';
import { WorkContext } from '../work.contexts';
import classes from './EditWork.module.scss';

interface Props {
  onCancel: () => void;
}

export function EditWork({ onCancel }: Props) {
  const engineerId = useContextSelector(EngineerContext, c => c.engineer._id);
  const { assigned, work } = useContextSelector(WorkContext, c => c);

  // eslint-disable-next-line no-console
  console.log(work);
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading)('add-work');

  const { update } = useWorks();

  function handleSubmit(form: RecordObject<AnyValue>) {
    const startDate = String(path(['startDate'], form));

    update(form);
    onCancel();
  }

  function handleError(message: string) {
    compose(dispatch, setMessage)(message);
  }

  function getWorkToEdit(work: RecordObject<AnyValue>) {

    let picked = pick(['_id','estimate', 'jiraEpic', 'jiraTicket', 'startDate', 'title'], work);
    const startDate = path(['startDate'], picked);
    const isDayjs = Object.getPrototypeOf(startDate) === Object.getPrototypeOf(dayjs());
    if (isDayjs) picked = assoc('startDate', (startDate as Dayjs).toString(), picked);
    const allRequiredPresent = Object.values(omit(['jiraEpic','_id'], picked)).every(Boolean);

    return allRequiredPresent ? picked : {};
  }

  return (
    <div className={clsx('padding-1', classes.container)}>
      <LazyLoad>
        <FormContext.Provider
          value={{
            scenario: createWorkFormScenario,
            submitData: handleSubmit,
            onError: handleError,
            process: { submit: isLoading },
            actions: { cancel: onCancel },
            initial: getWorkToEdit({ ...work, ...assigned }),
          }}
        >
          <Form />
        </FormContext.Provider>
      </LazyLoad>
    </div>
  );
}
