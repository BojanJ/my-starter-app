import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import { Bell, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/react.svg';

interface NavLink {
  to: string;
  label: string;
}

interface MainHeaderProps {
  navLinks: NavLink[];
}

const MainHeader: React.FC<MainHeaderProps> = ({ navLinks }) => {
  const { isAuthenticated, user } = useAuthStore();
  const { logout } = useAuth();

  // Filter out login link if user is already authenticated
  const filteredNavLinks = navLinks.filter((link) => !(isAuthenticated && link.to === '/login'));

  return (
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
                  {filteredNavLinks.map((link) => (
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
                {filteredNavLinks.map((link) => (
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
            {/* Notification bell */}
            <Button variant='ghost' size='icon'>
              <Bell className='h-6 w-6' />
              <span className='sr-only'>View notifications</span>
            </Button>

            {/* Conditional rendering based on auth state */}
            {isAuthenticated ? (
              /* Profile dropdown - shown when logged in */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='relative rounded-full' size='icon'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt='User avatar'
                      />
                      <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-48' align='end' forceMount>
                  <DropdownMenuLabel>{user?.name || 'My Account'}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Login button - shown when logged out */
              <NavLink to='/login'>
                <Button variant='outline' className='text-white border-gray-600 hover:bg-gray-700'>
                  Login
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
