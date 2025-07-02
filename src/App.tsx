import PWAInstallPrompt from '@/components/common/PWAInstallPrompt';
import PWAUpdateNotification from '@/components/common/PWAUpdateNotification';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Link, HashRouter as Router } from 'react-router-dom';
import './styles/App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className={`flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50`}>
      <nav className='p-4 bg-blue-600 text-white flex justify-between items-center'>
        <div className='space-x-4'>
          <Link to='/' className='hover:underline'>
            {t('nav.home')}
          </Link>
          <Link to='/about' className='hover:underline'>
            {t('nav.about')}
          </Link>
          <Link to='/dashboard' className='hover:underline'>
            {t('nav.dashboard')}
          </Link>
          {/* Example protected link */}
        </div>
        <div className='flex items-center space-x-2'>
          {isAuthenticated ? (
            <>
              <span>{user?.name}</span>
              <Button variant='outline' size='sm' onClick={() => logout()}>
                {t('auth.logout')}
              </Button>
            </>
          ) : (
            <Link to='/login'>
              <Button variant='outline' size='sm'>
                {t('auth.login')}
              </Button>
            </Link>
          )}
          <Button variant='outline' size='sm' onClick={() => changeLanguage('en')}>
            EN
          </Button>
          <Button variant='outline' size='sm' onClick={() => changeLanguage('es')}>
            ES
          </Button>
          <Button variant='outline' size='sm' onClick={() => changeLanguage('de')}>
            DE
          </Button>
          <ThemeToggle /> {/* Your dark mode toggle */}
        </div>
      </nav>

      <main className='flex-grow p-8'>
        <AppRoutes />
      </main>

      <footer className='p-4 bg-gray-200 dark:bg-gray-800 text-center text-sm'>
        &copy; {new Date().getFullYear()} React Pro Starter.
      </footer>

      {/* PWA Prompts - Place them globally */}
      <PWAInstallPrompt />
      <PWAUpdateNotification />
    </div>
  );
}

export default App;
