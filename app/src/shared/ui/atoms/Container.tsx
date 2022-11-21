import { CSSProperties, PropsWithChildren } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export function Container({ children, className, style }: PropsWithChildren<Props>) {
  return (
    <div
      id='ui-container'
      className={className}
      style={{
        width: '100%',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
