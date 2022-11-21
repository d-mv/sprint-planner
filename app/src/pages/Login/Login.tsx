import { Button, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ChangeEvent, useState } from 'react';
import { clsx } from 'clsx';

import { ErrorMessage, Tooltip } from '../../shared';
import classes from './Login.module.scss';
import { getMessage, getIsLoading, useSelector } from '../../state';
import { useLogin } from '../../entities';
import { setupText } from '../../shared/tools/text.tools';
import { TEXT } from '../../shared/data/text.data';

const TXT = setupText(TEXT)('login');

export function Login() {
  const [show, setShow] = useState(false);

  const [value, setValue] = useState('');

  const error = useSelector(getMessage);

  const isLoading = useSelector(getIsLoading)('login');

  const { connect } = useLogin();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  function handleMouseDown() {
    setShow(true);
  }

  function handleMouseUp() {
    setShow(false);
  }

  function handleSubmit() {
    connect(value);
  }

  function renderMessage() {
    if (isLoading) return <Typography variant='body2'>{TXT('isloading')}</Typography>;

    if (error) return <ErrorMessage message={error} />;

    return '';
  }

  function renderToggler() {
    return (
      <Tooltip message='Show/Hide'>
        <InputAdornment position='end'>
          <IconButton onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            {show ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      </Tooltip>
    );
  }

  return (
    <div id='login-page' className='center w-100 h-100'>
      <div className={clsx('column align-center', classes.center)}>
        <div className='line w-100'>
          <Typography variant='body1' className={classes.title}>
            {TXT('label')}
          </Typography>
          <Input
            id='password-input'
            type={show ? 'text' : 'password'}
            value={value}
            fullWidth
            onChange={handleChange}
            placeholder={TXT('placeholder')}
            endAdornment={renderToggler()}
          />
        </div>
        <div className={clsx('center m-b-start-1', classes.message)}>{renderMessage()}</div>
        <div className='padding-1'>
          <Button variant='contained' disabled={!value || isLoading} color='primary' onClick={handleSubmit}>
            {TXT('enter')}
          </Button>
        </div>
      </div>
    </div>
  );
}
