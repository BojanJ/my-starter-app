# Code Splitting and Chunk Optimization

This document explains the code splitting and chunk optimization strategies implemented in this application.

## Overview

To improve performance and reduce initial load times, the application implements:

1. **Manual Chunking** - Groups related dependencies into logical chunks
2. **Dynamic Imports** - Uses React.lazy and Suspense for component-level code splitting
3. **Route-based Splitting** - Loads route components only when needed
4. **Error Handling** - Graceful fallbacks for chunk loading failures

## Manual Chunking Configuration

The Vite config uses `rollupOptions.output.manualChunks` to group related dependencies:

- `react-vendor`: Core React libraries
- `ui-components`: UI component libraries like Radix UI
- `data-management`: State management and data fetching libraries
- `utils`: Utility libraries
- `i18n`: Internationalization libraries

This prevents large, monolithic vendor bundles and improves caching.

## Dynamic Imports

Components are loaded on-demand using React's lazy loading:

```tsx
const HomePage = lazy(() => import('@/pages/HomePage'));
```

The app uses a custom `lazyImport` utility to add error handling:

```tsx
const HomePage = lazy(() => lazyImport(() => import('@/pages/HomePage')));
```

## Loading States and Error Handling

- `<Suspense>` components with fallback UI display during component loading
- `<ErrorBoundary>` catches and gracefully handles chunk loading errors
- The `<PageLoader>` component provides consistent loading UIs

## Best Practices for Future Development

1. Always use lazy loading for route components
2. Consider pre-loading upcoming routes for faster perceived performance
3. Regularly analyze bundle sizes using build reports
4. Split large components into smaller chunks when appropriate
5. Use code splitting at key user interaction points (e.g., modals, tabs)
