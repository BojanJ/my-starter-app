import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import PWAUpdateNotification from "@/components/PWAUpdateNotification";
import { ThemeToggle } from "@/components/ThemeToggle"; // Assuming you have this
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              {t("nav.home")}
            </Link>
            <Link to="/about" className="hover:underline">
              {t("nav.about")}
            </Link>
            <Link to="/dashboard" className="hover:underline">
              {t("nav.dashboard")}
            </Link>{" "}
            {/* Example protected link */}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => changeLanguage("en")}
            >
              EN
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => changeLanguage("es")}
            >
              ES
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => changeLanguage("de")}
            >
              DE
            </Button>
            <ThemeToggle /> {/* Your dark mode toggle */}
          </div>
        </nav>

        <main className="flex-grow p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* Add more protected routes here */}
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center text-sm">
          &copy; {new Date().getFullYear()} React Pro Starter.
        </footer>

        {/* PWA Prompts - Place them globally */}
        <PWAInstallPrompt />
        <PWAUpdateNotification />
      </div>
    </Router>
  );
}

export default App;
