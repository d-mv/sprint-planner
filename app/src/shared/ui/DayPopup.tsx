import { Checkbox, FormControlLabel, Typography } from '@mui/material';

interface Props {
  onChange: (v: boolean) => void;
  isChecked: boolean;
}

export function DayPopup({ onChange, isChecked }: Props) {
  function handleChange() {
    onChange(!isChecked);
  }

  return (
    <div className='padding-1'>
      <FormControlLabel
        control={<Checkbox checked={isChecked} />}
        label={<Typography variant='body1'>is day off?</Typography>}
        onChange={handleChange}
      />
    </div>
  );
}
