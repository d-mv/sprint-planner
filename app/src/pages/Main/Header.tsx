import { AppBar, Toolbar, Typography } from '@mui/material';

import { IconButton, LoadingIndication } from '../../shared';

interface Props {
  toggle: () => void;
}

export function Header({ toggle }: Props) {
  return (
    <AppBar component='nav' position='fixed' color='primary' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          variant='menu'
          size='large'
          sx={{ mr: 0.5 }}
          color='inherit'
          onClick={toggle}
          iconProps={{
            fontSize: 'large',
          }}
        />
        <Typography variant='h1' component='div' color='white' sx={{ flexGrow: 1 }}>
          Sprint Planner
        </Typography>
        <LoadingIndication />
      </Toolbar>
    </AppBar>
  );
}
