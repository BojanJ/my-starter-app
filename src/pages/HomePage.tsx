import React from 'react';
import appConfig from '@/config/app.config';
import { useTranslation } from 'react-i18next';
import PostList from '@/components/common/PostList';
import ExampleDateDisplay from '@/components/ExampleDateDisplay'; // Import it

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-4'>{t('welcome', { appName: appConfig.appName })}</h1>
      <p className='text-xl text-gray-700 dark:text-gray-300 mb-8'>
        {t('greeting', { name: 'User' })}
      </p>

      <section className='mt-8'>
        <h2 className='text-2xl font-semibold mb-4'>Date Examples</h2>
        <ExampleDateDisplay isoDateString={new Date().toISOString()} /> {/* Use current date */}
        <ExampleDateDisplay isoDateString='2025-06-28T14:30:00Z' />{' '}
        {/* Past date for relative time */}
      </section>

      <section className='mt-12'>
        <PostList />
      </section>
    </div>
  );
};

export default HomePage;
