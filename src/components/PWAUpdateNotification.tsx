// src/components/PWAUpdateNotification.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { registerSW } from "virtual:pwa-register"; // Import registerSW for its update function

const PWAUpdateNotification: React.FC = () => {
  const { t } = useTranslation();
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const [updateSW, setUpdateSW] = useState<
    ((reloadPage?: boolean) => Promise<void>) | null
  >(null);

  useEffect(() => {
    // Register the service worker and get the update function
    registerSW({
      onNeedRefresh() {
        setNewVersionAvailable(true);
        console.log("PWA: New content available. Showing refresh prompt.");
      },
      onOfflineReady() {
        console.log("PWA: App is ready to work offline.");
      },
      onRegisteredSW(_swUrl, registration) {
        if (registration) {
          setUpdateSW(
            () => (reloadPage?: boolean) =>
              registration.update().then(() => {
                if (reloadPage) window.location.reload();
              })
          );
        }
      },
      // onError(error) {
      //   console.error('PWA: Service Worker registration error:', error);
      // }
    });

    // Cleanup function for when the component unmounts
    return () => {
      // If you were to unregister, you'd do it here: swRegister.unregister();
      // But for a PWA template, you generally keep the SW registered.
    };
  }, []);

  const handleRefreshClick = () => {
    if (updateSW) {
      updateSW(true); // Call the update function and reload the page
    }
  };

  if (!newVersionAvailable) {
    return null; // Don't render if no new version is available
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Card className="w-[350px] p-4 shadow-lg bg-orange-500 text-white dark:bg-orange-700">
        <CardHeader className="p-2 pb-0">
          <CardTitle className="text-xl">
            {t("pwa.new_version_available_title")}
          </CardTitle>
          <CardDescription className="text-gray-100">
            {t("pwa.new_version_available_description")}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end pt-2 gap-2">
          <Button
            variant="ghost"
            className="text-white hover:text-orange-500 hover:bg-white"
            onClick={() => setNewVersionAvailable(false)}
          >
            {t("common.dismiss")} {/* Assuming a 'dismiss' translation */}
          </Button>
          <Button
            className="bg-white text-orange-500 hover:bg-gray-100"
            onClick={handleRefreshClick}
          >
            {t("pwa.refresh_button")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PWAUpdateNotification;
