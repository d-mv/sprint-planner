import { CircularProgress } from '@mui/material';

export function Spinner() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
      <CircularProgress size={20} />
    </div>
  );
}
