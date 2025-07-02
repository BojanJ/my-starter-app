// src/layouts/GeneralLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import appConfig from '@/config/app.config';

const GeneralLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50'>
      {/* Header/Navigation */}
      <nav className='p-4 bg-blue-600 text-white flex justify-between items-center shadow-md'>
        <div className='flex items-center space-x-6'>
          <Link to='/' className='text-xl font-bold hover:text-gray-200'>
            {appConfig.appName}
          </Link>
          <Link to='/' className='hover:underline'>
            {t('nav.home')}
          </Link>
          <Link to='/about' className='hover:underline'>
            {t('nav.about')}
          </Link>
          <Link to='/login' className='hover:underline'>
            {t('nav.login')}
          </Link>
        </div>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' size='sm' onClick={() => changeLanguage('en')}>
            EN
          </Button>
          <Button variant='outline' size='sm' onClick={() => changeLanguage('es')}>
            ES
          </Button>
          <ThemeToggle />
        </div>
      </nav>

      <main className='flex-grow p-8 container mx-auto'>{children}</main>

      <footer className='p-4 bg-gray-200 dark:bg-gray-800 text-center text-sm border-t border-gray-300 dark:border-gray-700'>
        &copy; {new Date().getFullYear()} {appConfig.appName}. {t('footer.all_rights_reserved')}
      </footer>
    </div>
  );
};

export default GeneralLayout;
