import { Modal } from '@mui/material';
import { PropsWithChildren } from 'react';

import classes from './Dialog.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Dialog({ children, onClose, isOpen }: PropsWithChildren<Props>) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={classes.dialog}>{children}</div>
    </Modal>
  );
}
