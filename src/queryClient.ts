import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import localforage from 'localforage';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long the data remains "fresh". After this time, it's considered "stale"
      // and will be refetched in the background if accessed again.
      staleTime: 1000 * 60 * 5, // 5 minutes

      // How long inactive/unused data stays in the cache. After this, it's garbage collected.
      // This prevents the cache from growing indefinitely.
      gcTime: 1000 * 60 * 60 * 24, // 24 hours

      // Automatically refetch queries when the window regains focus.
      refetchOnWindowFocus: true,

      // Automatically refetch queries when the network status changes (online/offline).
      refetchOnReconnect: true,

      // Do not refetch on mount by default (can be overridden per query)
      refetchOnMount: false,

      // How many times to retry a failed query.
      retry: 3,

      // Delay between retries (exponential backoff is often preferred).
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Max 30 seconds
    },
    mutations: {
      // You can also define default options for mutations here
      retry: 1,
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: localforage,
});

persistQueryClient({
  queryClient,
  persister,
});
