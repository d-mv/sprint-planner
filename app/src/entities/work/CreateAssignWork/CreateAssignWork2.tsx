import clsx from 'clsx';
import { compose, o, path } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AnyValue, RecordObject } from '../../../models';
import { Form, FormContext, LazyLoad } from '../../../shared';
import { getIsLoading, setMessage, useDispatch, useSelector } from '../../../state';
import { EngineerContext } from '../../engineer/engineer.contexts';
import { createWorkFormScenario } from '../createWork.scenario';
import { useWorks } from '../useWorks.hook';
import classes from './CreateAssignWork.module.scss';

interface Props {
  onCancel: () => void;
}

export function CreateAssignWork2({ onCancel }: Props) {
  const engineerId = useContextSelector(EngineerContext, c => c.engineer._id);

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading)('add-work');

  const { add } = useWorks();

  function handleSubmit(form: RecordObject<AnyValue>) {
    const startDate = String(path(['startDate'], form));

    add(form, { engineerId, startDate });
    onCancel();
  }

  function handleError(message: string) {
    compose(dispatch, setMessage)(message);
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
          }}
        >
          <Form />
        </FormContext.Provider>
      </LazyLoad>
    </div>
  );
}
