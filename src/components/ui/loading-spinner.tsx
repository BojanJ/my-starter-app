import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'border-4 rounded-full animate-spin',
          sizeClasses[size],
          'border-gray-300 border-t-gray-800'
        )}
        role='status'
        aria-label='Loading'
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <LoadingSpinner size='lg' />
      <p className='mt-4 text-gray-600'>Loading...</p>
    </div>
  );
}
