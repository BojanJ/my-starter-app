import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
          <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-red-600 mb-4'>Something went wrong</h2>
            <p className='text-gray-700 mb-4'>
              We're sorry, but there was an error loading this page. Please try refreshing.
            </p>
            {this.state.error && (
              <div className='mt-4 p-3 bg-gray-100 rounded text-sm overflow-auto'>
                <p className='font-mono text-gray-800'>{this.state.error.message}</p>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
