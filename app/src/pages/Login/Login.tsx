import { Button, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ChangeEvent, useState } from 'react';

import { Spacer, Tooltip } from '../../atoms';
import classes from './Login.module.scss';
import clsx from 'clsx';
import { compose } from 'ramda';
import { getAuthError, getIsLoading, login, useDispatch, useSelector } from '../../state';
import { ifTrue } from '../../tools';
import { useLogin } from '../../adaptors';

export function Login() {
  const [show, setShow] = useState(false);

  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const error = useSelector(getAuthError);

  const isLoading = useSelector(getIsLoading)('login');

  const { request } = useLogin();

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
    request(value);
  }

  function renderMessage() {
    if (isLoading) return <Typography variant='body2'>Trying to login to DB...</Typography>;

    if (error)
      return (
        <Typography variant='body2' color='error'>
          {error}
        </Typography>
      );

    return '';
  }

  return (
    <div id='login-page' className={classes.container}>
      <div className={clsx('column', classes.center)}>
        <div className={classes['input-block']}>
          <Typography variant='body1' className={classes.title}>
            Enter connection string
          </Typography>
          <Input
            id='password-input'
            type={show ? 'text' : 'password'}
            value={value}
            fullWidth
            onChange={handleChange}
            endAdornment={
              <Tooltip message='Show/Hide'>
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Toggle password visibility'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  >
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              </Tooltip>
            }
          />
        </div>
        <div className={classes.message}>{renderMessage()}</div>
        <div className={classes.button}>
          <Button variant='contained' disabled={!value || isLoading} color='primary' onClick={handleSubmit}>
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
}
