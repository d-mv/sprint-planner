import { CSSProperties } from 'react';

const vStyle: CSSProperties = { width: '.1rem', height: '1rem' };

const hStyle: CSSProperties = { height: '.1rem', width: '1rem' };

interface Props {
  vertical: boolean;
  horizontal: boolean;
  style: CSSProperties;
  className: string;
}
export function Spacer({
  vertical,
  horizontal,
  style,
  className,
}: Partial<Props>) {
  return (
    <div
      style={{ ...(vertical ? vStyle : hStyle), ...style }}
      className={className}
    />
  );
}
