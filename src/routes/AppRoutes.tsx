import { Route, Routes } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';
import DashboardPage from '../pages/DashboardPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/login' element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        {/* Add more protected routes here */}
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
