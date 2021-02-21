import React, { ReactNode } from 'react';

type ErrorHandler = (error: Error, info: React.ErrorInfo) => void;
type ErrorHandlingComponent<Props> = (
  props: Props,
  error?: Error
) => React.ReactNode;

interface ErrorState {
  error?: Error;
}

export default function Catch<Props extends {}>(
  component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler
): React.ComponentType<Props> {
  return class extends React.Component<Props, ErrorState> {
    state: ErrorState = {
      error: undefined,
    };

    static getDerivedStateFromError(error: Error): { error: Error } {
      return { error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
      if (errorHandler) {
        errorHandler(error, info);
      }
    }

    render(): ReactNode {
      return component(this.props, this.state.error);
    }
  };
}