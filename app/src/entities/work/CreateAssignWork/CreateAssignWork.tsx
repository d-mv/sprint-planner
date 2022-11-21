import { clsx } from 'clsx';
import { compose, o, path } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AnyValue, RecordObject, Form, FormContext, LazyLoad } from '../../../shared';
import { getIsLoading, getScenarioByLabel, setMessage, useDispatch, useSelector } from '../../../state';
import { EngineerContext } from '../../engineer/engineer.contexts';
import { useWorks } from '../useWorks.hook';
import classes from './CreateAssignWork.module.scss';

interface Props {
  onCancel: () => void;
}

export function CreateAssignWork({ onCancel }: Props) {
  const engineerId = useContextSelector(EngineerContext, c => c.engineer._id);

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);

  const { add } = useWorks();

  const scenario = useSelector(getScenarioByLabel('createWork'));

  if (!scenario) return null;

  function handleSubmit(form: RecordObject<AnyValue>) {
    const startDate = String(path(['startDate'], form));

    add(form, { engineerId, startDate }, onCancel);
  }

  function handleError(message: string) {
    compose(dispatch, setMessage)(message);
  }

  return (
    <div className={clsx('padding-1', classes.container)}>
      <LazyLoad>
        <FormContext.Provider
          value={{
            scenario,
            submitData: handleSubmit,
            onError: handleError,
            process: { submit: isLoading('add-work') },
            actions: { cancel: onCancel },
          }}
        >
          <Form />
        </FormContext.Provider>
      </LazyLoad>
    </div>
  );
}
