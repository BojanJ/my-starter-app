import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, persister } from './queryClient';
import './i18n';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ThemeProvider } from './components/theme-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </PersistQueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
