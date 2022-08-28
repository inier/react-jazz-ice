// reference： https://github.com/bvaughn/react-error-boundary
import React, { Component } from 'react';

import ErrorBoundaryFallback from './ErrorBoundaryFallback';

interface IProps {
  children?: React.ReactNode;
  Fallback?: React.ComponentType<any>;
  onError?: (err: any, componentStack: string) => void;
}

interface IErrorInfo {
  componentStack: string;
}

interface IState {
  hasError: boolean;
  error?: Error | null;
  info?: IErrorInfo;
}

// eslint-disable-next-line @iceworks/best-practices/recommend-functional-component
class ErrorBoundary extends Component<IProps, IState> {
  static defaultProps: IProps = {
    Fallback: ErrorBoundaryFallback,
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: {
        componentStack: '',
      },
    };
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        // istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment.
        onError && onError.call(this, error, info.componentStack);
      } catch (ignoredError) {
        // ignored error
      }
    }

    // You can also log the error to an error reporting service
    this.logErrorToMyService(error, info);
  }

  logErrorToMyService = (error, info) => {
    this.setState({
      error,
      info,
    });
  };

  render() {
    const { children, Fallback } = this.props;
    const { hasError, error, info } = this.state;

    // render fallback UI if there is error
    if (hasError && error !== null && typeof Fallback === 'function') {
      return <Fallback componentStack={info?.componentStack} error={error} />;
    }

    return children || null;
  }
}


export default ErrorBoundary;
