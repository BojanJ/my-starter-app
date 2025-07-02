// src/components/PWAInstallPrompt.tsx
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
import appConfig from "@/config/app.config";

// Type definition for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault(); // Prevent the default browser prompt
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Only show custom prompt if it hasn't been dismissed or installed
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    setShowInstallPrompt(false); // Hide the prompt immediately
    deferredPrompt.prompt(); // Show the browser's install prompt

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    if (outcome === "accepted") {
      // User accepted the prompt
      setDeferredPrompt(null); // Clear prompt as it's been handled
    } else {
      // User dismissed the prompt
      // Optionally, you might show the prompt again later or handle this differently
    }
  };

  // Don't render anything if the prompt isn't available or already dismissed
  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Card className="w-[350px] p-4 shadow-lg">
        <CardHeader>
          <CardTitle>{t("pwa.install_prompt_title")}</CardTitle>
          <CardDescription>
            {t("pwa.install_prompt_description", {
              appName: appConfig.appName,
            })}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setShowInstallPrompt(false)}>
            {t("common.cancel")}{" "}
            {/* Assuming you have a 'cancel' translation */}
          </Button>
          <Button onClick={handleInstallClick}>
            {t("pwa.install_button")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt;
