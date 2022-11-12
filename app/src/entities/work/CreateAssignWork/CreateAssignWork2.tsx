import { Button, TextField } from '@mui/material';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { o } from 'ramda';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { TEXT } from '../../../data';
import { Form, FormContext, LazyLoad } from '../../../shared';
import { setupText } from '../../../tools';
import { EngineerContext } from '../../engineer/engineer.contexts';
import { createWorkFormScenario } from '../createWork.scenario';
import { useWorks } from '../useWorks.hook';
import { Work } from '../work.models';
import classes from './CreateAssignWork.module.scss';

const TXT = setupText(TEXT)(['work', 'form']);

const defaultForm: Work = {
  jiraTicket: '',
  estimate: 0,
  title: '',
};

interface Props {
  onCancel: () => void;
}

export function CreateAssignWork2({ onCancel }: Props) {
  const engineerId = useContextSelector(EngineerContext, c => c.engineer._id);

  const [form, setForm] = useState<Work>(defaultForm);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isValid && (!form.jiraTicket || !form.title || !form.estimate)) setIsValid(false);
    else if (!isValid && form.jiraTicket && form.title && form.estimate) setIsValid(true);
  }, [form.estimate, form.jiraTicket, form.title, isValid]);

  const [startDate, setStartDate] = useState(dayjs());

  const { add } = useWorks();

  function handleChange(key: keyof typeof form) {
    return function change(e: ChangeEvent<HTMLInputElement>) {
      let value: string | number = e.currentTarget.value;

      // parseInt is safe, as input type is number and it's going to be whole
      // because of parseInt
      if (key === 'estimate') value = parseInt(value);

      setForm({ ...form, [key]: value });
    };
  }

  function handleCancel() {
    setForm(defaultForm);
    onCancel();
  }

  function handleAssign() {
    add(form, { engineerId, startDate: startDate.toString() });

    handleCancel();
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    const value = dayjs(e.currentTarget.value);

    setStartDate(value);
  }

  function handleSubmit(form: FormData) {
    form.forEach(e => {
      // eslint-disable-next-line no-console
      console.log(e);
    });
    // dispatch(identityLogin(form));
  }

  return (
    <div className={clsx('padding-1', classes.container)}>
      <LazyLoad>
        <FormContext.Provider value={{ scenario: createWorkFormScenario, submit: handleSubmit }}>
          <Form />
        </FormContext.Provider>
      </LazyLoad>
      {/* <div className={classes.inputs}>
        <div className='line s-between'>
          <TextField
            className={classes['input-item']}
            required
            label={TXT('jira')}
            variant='standard'
            value={form.jiraTicket}
            onChange={handleChange('jiraTicket')}
          />
          <TextField
            className={classes['input-item']}
            label={TXT('epic')}
            variant='standard'
            value={form.jiraEpic}
            onChange={handleChange('jiraEpic')}
          />
        </div>
        <TextField
          className={classes['input-item']}
          required
          label={TXT('title')}
          variant='standard'
          value={form.title}
          onChange={handleChange('title')}
        />
        <div className='line s-between'>
          <TextField
            className={classes['input-item']}
            label={TXT('est')}
            required
            variant='standard'
            type='number'
            value={form.estimate}
            onChange={handleChange('estimate')}
          />
        </div>
        <div className='line s-between m-b-start-1'>
          <TextField
            id='date'
            required
            className={classes.date}
            type='date'
            label={TXT('start')}
            value={startDate.format('YYYY-M-DD')}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
        </div>
        <div className={clsx('center', classes.actions)}>
          <Button variant='contained' size='small' disabled={!isValid} onClick={handleAssign}>
            {TXT('createAssign')}
          </Button>
        </div>
      </div> */}
    </div>
  );
}
