// src/layouts/MobileLayout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Compass, User, LogIn, LogOut, Settings } from 'lucide-react'; // Icons
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import appConfig from '@/config/app.config';
import PWAInstallPrompt from '@/components/common/PWAInstallPrompt';
import PWAUpdateNotification from '@/components/common/PWAUpdateNotification';

const MobileLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home, show: true },
    { path: '/about', label: t('nav.about'), icon: Compass, show: true },
    { path: '/dashboard', label: t('nav.dashboard'), icon: User, show: user !== null },
    { path: '/login', label: t('nav.login'), icon: LogIn, show: user === null },
    { path: '/dashboard/settings', label: t('nav.settings'), icon: Settings, show: user !== null },
    { path: '/logout', label: t('nav.logout'), icon: LogOut, show: user !== null, action: logout },
  ].filter((item) => item.show);

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 pb-16'>
      {' '}
      {/* pb-16 for bottom nav */}
      {/* Mobile Header (Optional, could be simple app title) */}
      <header className='p-4 bg-blue-600 dark:bg-blue-800 text-white flex justify-between items-center shadow-md'>
        <span className='text-xl font-bold'>{appConfig.appName}</span>
        <div className='flex space-x-2'>
          <ThemeToggle />
          <Button variant='outline' size='sm' onClick={() => changeLanguage('en')}>
            EN
          </Button>
          <Button variant='outline' size='sm' onClick={() => changeLanguage('es')}>
            ES
          </Button>
        </div>
      </header>
      {/* Main Content Area */}
      <main className='flex-grow p-4 overflow-auto'>{children}</main>
      {/* Bottom Navigation Bar */}
      <nav className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg flex justify-around items-center h-16 z-50'>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={
              item.action
                ? (e) => {
                    e.preventDefault();
                    item.action();
                  }
                : undefined
            }
            className={`flex flex-col items-center justify-center text-xs transition-colors ${
              location.pathname === item.path
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300'
            }`}>
            <item.icon className='h-6 w-6 mb-1' />
            <span className='text-center'>{item.label}</span>
          </Link>
        ))}
      </nav>
      {/* PWA Prompts (ensure they are above the bottom nav if fixed) */}
      <PWAInstallPrompt />
      <PWAUpdateNotification />
    </div>
  );
};

export default MobileLayout;
