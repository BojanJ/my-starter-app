import PWAInstallPrompt from '@/components/common/PWAInstallPrompt';
import PWAUpdateNotification from '@/components/common/PWAUpdateNotification';
import { setDayjsLocale } from '@/utils/date'; // Import the locale setter
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/App.css';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    setDayjsLocale(i18n.language);
    i18n.on('languageChanged', (lng: string) => {
      setDayjsLocale(lng);
    });
  }, [i18n]);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  return (
    <>
      <main className='min-h-screen'>
        <AppRoutes />
      </main>

      {/* PWA Prompts - Place them globally */}
      <PWAInstallPrompt />
      <PWAUpdateNotification />
    </>
  );
}

export default App;
