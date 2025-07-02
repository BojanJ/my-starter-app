import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import appConfig from '@/config/app.config';

const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='bg-gray-50 dark:bg-gray-900'>
          <div className='container mx-auto px-4 py-20 text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>{appConfig.appName}</h1>
            <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8'>
              {appConfig.appDescription}
            </p>
            <Button size='lg'>Get Started</Button>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>Features</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <Card>
                <CardHeader>
                  <CardTitle>Feature One</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    Praesent libero.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Feature Two</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
                    imperdiet.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Feature Three</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className='bg-gray-100 dark:bg-gray-800 py-20'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-bold mb-4'>Ready to get started?</h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
              Join us now and take your projects to the next level.
            </p>
            <Button size='lg' variant='outline'>
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-8'>
        <div className='container mx-auto px-4 text-center'>
          <p>
            &copy; {new Date().getFullYear()} {appConfig.appName}. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
