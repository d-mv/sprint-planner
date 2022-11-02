import { Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

interface Props {
  message: string;
  className?: string;
}
export function Message({message, className }:Props) {
	return (
    <Typography
      className={className}
      style={{ color: blueGrey['400'] }}
      variant='body1'
    >
      {message}
    </Typography>
  );
}