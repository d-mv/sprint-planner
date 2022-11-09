import { Typography } from '@mui/material';

interface Props {
  name: string;
}

export function SprintName({ name }: Props) {
  return (
    <div className='center margin-center w-100' style={{ padding: '.5rem 0' }}>
      <Typography variant='body1'>{name}</Typography>
    </div>
  );
}
