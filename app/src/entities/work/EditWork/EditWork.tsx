import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { AnyValue, R, RecordObject } from '@mv-d/toolbelt';
import { useContextSelector } from 'use-context-selector';

import { Form, format, FormContext, LazyLoad } from '../../../shared';
import { getIsLoading, getScenarioByLabel, setMessage, useDispatch, useSelector } from '../../../state';
import { useWorks } from '../useWorks.hook';
import { WorkContext } from '../work.contexts';
import classes from './EditWork.module.scss';

interface Props {
  onCancel: () => void;
}

export default function EditWork({ onCancel }: Props) {
  const { assigned, work } = useContextSelector(WorkContext, c => c);

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading)('update-work');

  const { update } = useWorks();

  const scenario = useSelector(getScenarioByLabel('createWork'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    if (!isLoading) update(form, onCancel);
  }

  function handleError(message: string) {
    R.compose(dispatch, setMessage)(message);
  }

  function getWorkToEdit(work: RecordObject<AnyValue>) {
    let picked = R.pick(['_id', 'estimate', 'jiraEpic', 'jiraTicket', 'startDate', 'title'], work);

    const startDate = dayjs(R.path(['startDate'], picked));

    picked = R.assoc('startDate', format()(startDate), picked);

    const allRequiredPresent = Object.values(R.omit(['jiraEpic', '_id'], picked)).every(Boolean);

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
