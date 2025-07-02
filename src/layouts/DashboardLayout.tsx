// src/layouts/DashboardLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import appConfig from '@/config/app.config';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Home, Settings, Users } from 'lucide-react';

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { logout, user } = useAuth();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className='flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50'>
      {/* Sidebar */}
      <aside className='w-64 bg-gray-800 dark:bg-gray-950 text-white flex flex-col p-4 shadow-lg'>
        <div className='text-2xl font-bold mb-8 text-blue-300'>{appConfig.appShortName}</div>
        <nav className='flex-grow space-y-2'>
          <Link
            to='/dashboard'
            className='flex items-center p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors'>
            <Home className='mr-3 h-5 w-5' />
            {t('nav.dashboard')}
          </Link>
          <Link
            to='/dashboard/settings'
            className='flex items-center p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors'>
            <Settings className='mr-3 h-5 w-5' />
            {t('nav.settings')}
          </Link>
          <Link
            to='/dashboard/users'
            className='flex items-center p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors'>
            <Users className='mr-3 h-5 w-5' />
            {t('nav.users')}
          </Link>
        </nav>
        <div className='mt-auto pt-4 border-t border-gray-700 dark:border-gray-800'>
          {user && <p className='text-sm mb-2 text-gray-300'>Logged in as: {user.email}</p>}
          <Button
            variant='ghost'
            className='w-full justify-start text-white hover:bg-gray-700 dark:hover:bg-gray-800'
            onClick={() => logout()}>
            <LogOut className='mr-3 h-5 w-5' />
            {t('nav.logout')}
          </Button>
        </div>
      </aside>

      {/* Main content area for dashboard */}
      <div className='flex-grow flex flex-col'>
        <header className='p-4 bg-white dark:bg-gray-800 shadow-sm flex justify-end items-center space-x-2'>
          <ThemeToggle />
          <Button variant='outline' size='sm' onClick={() => changeLanguage('en')}>
            EN
          </Button>
          <Button variant='outline' size='sm' onClick={() => changeLanguage('es')}>
            ES
          </Button>
        </header>

        <main className='flex-grow p-8 overflow-auto'>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
