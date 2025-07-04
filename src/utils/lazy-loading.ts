/**
 * A utility function that wraps dynamic imports with error handling.
 * This can be used with React.lazy() to handle chunk loading errors gracefully.
 *
 * @param importFn - The dynamic import function to wrap
 * @returns A Promise that resolves to the imported module
 */
export function lazyImport<T>(importFn: () => Promise<T>) {
  return importFn().catch((error) => {
    console.error('Error loading chunk:', error);
    // You could also show an error UI or retry the import
    throw error; // Re-throw to let React's error boundary handle it
  });
}

/**
 * Preload a component for faster rendering when it's actually needed
 * Call this early when you think a user might navigate to a route soon
 *
 * @param importFn - The dynamic import function to preload
 */
export function preloadRoute(importFn: () => Promise<unknown>): void {
  importFn().catch((err) => {
    console.warn('Error preloading route:', err);
    // Silently fail as this is just an optimization
  });
}
