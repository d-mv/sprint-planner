import { Typography } from '@mui/material';

interface Props {
  name: string;
}

export function SprintName({ name }: Props) {
  return (
    <div className='border center margin-center border-bottom-w-0 w-100' style={{ padding: '.5rem 0' }}>
      <Typography variant='body1'>{name}</Typography>
    </div>
  );
}
