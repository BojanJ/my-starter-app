import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import appConfig from "@/config/app.config";
import { Button } from "@/components/ui/button";
import HomePage from "./pages/HomePage";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";

function NavigateButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate("/home");
      }}
    >
      Go to Home
    </Button>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <Router>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{appConfig.appName}</h1>
      <h2>{t("welcome")}</h2>
      <p>{appConfig.appDescription}</p>
      <div className="card">
        <LanguageSwitcher />
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <NavigateButton />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="footer-info">
        Developed by {appConfig.appAuthor} (v{appConfig.appVersion})
      </p>
      <Routes>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
