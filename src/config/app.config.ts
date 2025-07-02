// src/config/app.config.ts

interface AppConfig {
  appName: string;
  appDescription: string;
  appShortName: string;
  appVersion: string;
  appAuthor: string;
  appUrl: string;
  // Add any other global, configurable app details here
  // For example, API base URL (though often better in .env)
}

const appConfig: AppConfig = {
  appName: "React Pro Starter",
  appDescription:
    "A professional React starter template for modern web applications.",
  appShortName: "RPS",
  appVersion: "1.0.0",
  appAuthor: "Bojan Janevski",
  appUrl: "https://your-domain.com", // This should be your deployed app URL
};

export default appConfig;
