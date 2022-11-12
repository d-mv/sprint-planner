import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { ifTrue } from '../../../../../tools';

import classes from './Message.module.scss';

export interface MessageProps {
  type: 'error' | 'info';
  title: string;
}

export function Message({ children, type }: PropsWithChildren<Partial<MessageProps>>) {
  // <Tooltip className='tooltip' title={title ?? ''}>
  return (
    <div
      aria-label='form-input-message'
      className={clsx(classes.container, { [classes.error]: type === 'error', [classes.info]: type === 'info' })}
    >
      {ifTrue(children, <p className='p5'>{children}</p>, null)}
    </div>
  );
}
