import { Route, Routes } from 'react-router-dom';
import { withPageLayout } from '@/hocs/withPageLayout';

// Import Pages
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';

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
    <Routes>
      <Route path='/' element={<HomePageWithLayout />} />
      <Route path='/about' element={<AboutPageWithLayout />} />
      <Route path='/login' element={<LoginPageWithLayout />} />
      <Route path='/dashboard' element={<DashboardPageWithLayout />} />
      <Route path='*' element={<NotFoundPageWithLayout />} />
    </Routes>
  );
}

export default AppRoutes;
