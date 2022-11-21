import { clsx } from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { assoc, compose, omit, path, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AnyValue, RecordObject, Form, FormContext, LazyLoad } from '../../../shared';
import { getIsLoading, getScenarioByLabel, setMessage, useDispatch, useSelector } from '../../../state';
import { useWorks } from '../useWorks.hook';
import { WorkContext } from '../work.contexts';
import classes from './EditWork.module.scss';

interface Props {
  onCancel: () => void;
}

export function EditWork({ onCancel }: Props) {
  const { assigned, work } = useContextSelector(WorkContext, c => c);

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading)('add-work');

  const { update } = useWorks();

  const scenario = useSelector(getScenarioByLabel('createWork'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    update(form, onCancel);
  }

  function handleError(message: string) {
    compose(dispatch, setMessage)(message);
  }

  function getWorkToEdit(work: RecordObject<AnyValue>) {
    let picked = pick(['_id', 'estimate', 'jiraEpic', 'jiraTicket', 'startDate', 'title'], work);

    const startDate = path(['startDate'], picked);

    const isDayjs = Object.getPrototypeOf(startDate) === Object.getPrototypeOf(dayjs());

    if (isDayjs) picked = assoc('startDate', (startDate as Dayjs).toString(), picked);

    const allRequiredPresent = Object.values(omit(['jiraEpic', '_id'], picked)).every(Boolean);

    return allRequiredPresent ? picked : {};
  }

  return (
    <div className={clsx('padding-1', classes.container)}>
      <LazyLoad>
        <FormContext.Provider
          value={{
            scenario,
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
