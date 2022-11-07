import { Checkbox, FormControlLabel, Typography } from '@mui/material';

interface Props {
  onChange: () => void;
  isChecked: boolean;
}

export function DayPopup({ onChange, isChecked }: Props) {
  return (
    <div className='padding-1'>
      <FormControlLabel
        control={<Checkbox checked={isChecked} />}
        label={<Typography variant='body1'>is day off?</Typography>}
        onChange={onChange}
      />
    </div>
  );
}
