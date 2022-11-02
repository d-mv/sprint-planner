import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { map } from 'ramda';
import { useState } from 'react';

import { TEXT } from '../../../data';
import { Engineer as EngineerType } from '../engineer.models';
import {
  addEngineer,
  getNotAddedEngineers,
  useDispatch,
  useSelector,
} from '../../../state';
import { ifTrue, setupText } from '../../../tools';
import classes from './AddEngineer.module.scss';
import { Message } from '../../../atoms';

const TXT = setupText(TEXT)('engineer');

interface Props {
  onCancel: () => void;
}
export function AddEngineer({ onCancel }: Props) {
  const engineers = useSelector(getNotAddedEngineers);
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();

  function handleChange(e: SelectChangeEvent) {
    setSelected(e.target.value);
  }

  function handleAdd() {
    dispatch(addEngineer(selected));
    onCancel();
  }

  function renderEngineerName(engineer: EngineerType) {
    return (
      <MenuItem key={engineer.id} value={engineer.id}>
        {engineer.person.lastName}
      </MenuItem>
    );
  }

  function renderSelector() {
    return (
      <Select
        className={classes.selector}
        value={selected}
        onChange={handleChange}
      >
        {map(renderEngineerName, engineers)}
      </Select>
    );
  }

  function renderActions() {
    return (
      <div className={classes.action}>
        <Button
          variant='contained'
          disabled={isDisabled}
          size='small'
          onClick={handleAdd}
        >
          {TXT('addSelected')}
        </Button>
      </div>
    );
  }

  const isDisabled = Boolean(engineers.length && !selected);

  const renderMessage = () => (
    <Message className={classes.message} message={TXT('noAdd')} />
  );

  return (
    <div className={classes.container}>
      {ifTrue(engineers.length, renderSelector)}
      {ifTrue(!engineers.length, renderMessage)}
      {ifTrue(engineers.length, renderActions)}
    </div>
  );
}
