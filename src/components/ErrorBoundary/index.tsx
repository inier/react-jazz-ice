// reference： https://github.com/bvaughn/react-error-boundary

import { Component } from 'react';
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
  error?: any;
  info?: IErrorInfo;
}

// eslint-disable-next-line @iceworks/best-practices/recommend-functional-component
class ErrorBoundary extends Component<IProps, IState> {
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
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
        onError && onError.call(this, error, info ? info.componentStack : '');
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
    const { hasError, error, info } = this.state;
    const { children, Fallback = ErrorBoundaryFallback } = this.props;

    // render fallback UI if there is error
    if (hasError || error !== null) {
      return (
        <Fallback
          componentStack={
            // istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment.
            info ? info.componentStack : ''
          }
          error={error}
        />
      );
    }

    return children || null;
  }
}

export default ErrorBoundary;
