import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Needed for aliases

// Import your app configuration
import appConfig from "./src/config/app.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define global constant replacements
  define: {
    "import.meta.env.VITE_APP_NAME": JSON.stringify(appConfig.appName),
    "import.meta.env.VITE_APP_DESCRIPTION": JSON.stringify(
      appConfig.appDescription
    ),
    // You can expose other config values here if needed in index.html or globally
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
