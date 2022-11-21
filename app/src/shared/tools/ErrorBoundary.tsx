import React, { ReactNode } from 'react';

type ErrorInfo = { componentStack: unknown };

interface Props {
  children: ReactNode;
  componentId: string;
  traceId?: string;
  details?: string;
}

interface State {
  error: Error | undefined;
  errorInfo: ErrorInfo | undefined;
  errorName: string;
  errorMessage: string;
  componentId: string;
  traceId: string;
  details?: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: undefined,
      errorInfo: undefined,
      errorMessage: '',
      errorName: '',
      details: props.details,
      componentId: props.componentId,
      traceId: props.traceId ?? 'xxxx',
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorMessage: error.message.split('\n')[0],
      errorName: error.name,
      errorInfo: errorInfo,
    });
  }

  buildReport() {
    const { errorMessage, errorInfo, componentId, traceId, details } = this.state;

    return {
      message: errorMessage,
      stack: errorInfo?.componentStack ?? errorInfo,
      componentId,
      traceId,
      details,
    };
  }

  render() {
    console.error({ message: JSON.stringify(this.buildReport()) });

    if (this.state.errorInfo) return null;

    return this.props.children;
  }
}
