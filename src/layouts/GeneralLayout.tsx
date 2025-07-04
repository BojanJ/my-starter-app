import React from 'react';
import MainHeader from '@/components/main-header';

const GeneralLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/login', label: 'Login' }, // MainHeader will handle showing/hiding this based on auth state
  ];

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50'>
      <MainHeader navLinks={navLinks} />
      <main className='flex-grow p-8 container mx-auto'>{children}</main>
    </div>
  );
};

export default GeneralLayout;
