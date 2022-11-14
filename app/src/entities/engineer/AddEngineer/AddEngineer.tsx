import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { compose, map } from 'ramda';
import { useState } from 'react';

import { TEXT } from '../../../data';
import { Engineer as EngineerType } from '../engineer.models';
import { addEngineer, getNotAddedEngineers, useDispatch, useSelector } from '../../../state';
import { ifTrue, setupText } from '../../../tools';
import classes from './AddEngineer.module.scss';
import { Message } from '../../../shared';
import { MongoDocument } from '../../../models';
import { makeName } from '../engineer.tools';
import clsx from 'clsx';

const TXT = setupText(TEXT)('engineer');

interface Props {
  onCancel: () => void;
}

export function AddEngineer({ onCancel }: Props) {
  const engineers = useSelector(getNotAddedEngineers);

  const [selected, setSelected] = useState('');

  const dispatch = useDispatch();

  const isDisabled = Boolean(engineers.length && !selected);

  function handleChange(e: SelectChangeEvent) {
    setSelected(e.target.value);
  }

  function handleAdd() {
    compose(dispatch, addEngineer)(selected);
    onCancel();
  }

  function renderEngineerName(engineer: MongoDocument<EngineerType>) {
    return (
      <MenuItem key={engineer._id} value={engineer._id}>
        {makeName(engineer.person)}
      </MenuItem>
    );
  }

  function renderSelector() {
    return (
      <Select className='w-100' value={selected} onChange={handleChange}>
        {map(renderEngineerName, engineers)}
      </Select>
    );
  }

  function renderActions() {
    return (
      <div className={clsx('center', classes.action)}>
        <Button variant='contained' disabled={isDisabled} size='small' onClick={handleAdd}>
          {TXT('addSelected')}
        </Button>
      </div>
    );
  }

  const renderMessage = () => <Message className={classes.message} message={TXT('noAdd')} />;

  return (
    <div className='line s-between padding-1'>
      {ifTrue(engineers.length, renderSelector)}
      {ifTrue(!engineers.length, renderMessage)}
      {ifTrue(engineers.length, renderActions)}
    </div>
  );
}
