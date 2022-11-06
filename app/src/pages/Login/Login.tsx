import { Button, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import { ErrorMessage, Tooltip } from '../../atoms';
import classes from './Login.module.scss';
import { getMessage, getIsLoading, useSelector } from '../../state';
import { setupText } from '../../tools';
import { useLogin } from '../../adaptors';
import { TEXT } from '../../data';

const TXT = setupText(TEXT)('login');

export function Login() {
  const [show, setShow] = useState(false);

  const [value, setValue] = useState('');

  const error = useSelector(getMessage);

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
    <div id='login-page' className={classes.container}>
      <div className={clsx('column', classes.center)}>
        <div className={classes['input-block']}>
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
        <div className={classes.message}>{renderMessage()}</div>
        <div className={classes.button}>
          <Button variant='contained' disabled={!value || isLoading} color='primary' onClick={handleSubmit}>
            {TXT('enter')}
          </Button>
        </div>
      </div>
    </div>
  );
}
