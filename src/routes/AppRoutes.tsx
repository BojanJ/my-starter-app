import { Route, Routes } from 'react-router-dom';
import { withPageLayout } from '@/hocs/withPageLayout';
import { lazy, Suspense } from 'react';
import { PageLoader } from '@/components/ui/loading-spinner';
import { lazyImport } from '@/utils/lazy-loading';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Import pages using lazy loading with error handling
const HomePage = lazy(() => lazyImport(() => import('@/pages/HomePage')));
const AboutPage = lazy(() => lazyImport(() => import('@/pages/AboutPage')));
const LoginPage = lazy(() => lazyImport(() => import('@/pages/LoginPage')));
const DashboardPage = lazy(() => lazyImport(() => import('@/pages/DashboardPage')));
const NotFoundPage = lazy(() => lazyImport(() => import('@/pages/NotFoundPage')));

// Wrap pages with the HOC
const HomePageWithLayout = withPageLayout(HomePage, { layoutType: 'general' });
const AboutPageWithLayout = withPageLayout(AboutPage, { layoutType: 'general' });
const LoginPageWithLayout = withPageLayout(LoginPage, { layoutType: 'general' });
const DashboardPageWithLayout = withPageLayout(DashboardPage, {
  layoutType: 'dashboard',
  isPrivate: false,
});
const NotFoundPageWithLayout = withPageLayout(NotFoundPage, { layoutType: 'general' });

function AppRoutes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<HomePageWithLayout />} />
          <Route path='/about' element={<AboutPageWithLayout />} />
          <Route path='/login' element={<LoginPageWithLayout />} />
          <Route path='/dashboard' element={<DashboardPageWithLayout />} />
          <Route path='*' element={<NotFoundPageWithLayout />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default AppRoutes;
