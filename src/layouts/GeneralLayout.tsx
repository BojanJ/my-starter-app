// src/layouts/GeneralLayout.tsx
import appConfig from '@/config/app.config';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/react.svg'; // Assuming you have a logo image
const GeneralLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/login', label: 'Login' },
  ];

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50'>
      <header className='bg-gray-800 text-white shadow-md'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='flex items-center sm:hidden'>
              {/* Mobile menu button*/}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Menu className='h-6 w-6' />
                    <span className='sr-only'>Open main menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side='left' className='bg-gray-800 text-white border-r-0'>
                  <div className='flex shrink-0 items-center mb-6 p-2'>
                    <img className='h-8 w-auto' src={logo} alt='Your Company' />
                  </div>
                  <nav className='grid gap-y-2'>
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `block rounded-md px-3 py-2 text-base font-medium ${
                            isActive
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          }`
                        }>
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex shrink-0 items-center'>
                <img className='h-8 w-auto' src={logo} alt='Your Company' />
              </div>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `rounded-md px-3 py-2 text-sm font-medium ${
                          isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`
                      }>
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <Button variant='ghost' size='icon'>
                <Bell className='h-6 w-6' />
                <span className='sr-only'>View notifications</span>
              </Button>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='relative rounded-full' size='icon'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt='User avatar'
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-48' align='end' forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className='flex-grow p-8 container mx-auto'>{children}</main>

      <footer className='p-4 bg-gray-200 dark:bg-gray-800 text-center text-sm border-t border-gray-300 dark:border-gray-700'>
        &copy; {new Date().getFullYear()} {appConfig.appName}. {t('footer.all_rights_reserved')}
      </footer>
    </div>
  );
};

export default GeneralLayout;
