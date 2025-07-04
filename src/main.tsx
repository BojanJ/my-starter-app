import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, persister } from './queryClient';
import './i18n';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ThemeProvider } from './components/theme-provider';
import { PageLoader } from './components/ui/loading-spinner';

// Use lazy loading for the main App component
const App = lazy(() => import('./App.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </PersistQueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
