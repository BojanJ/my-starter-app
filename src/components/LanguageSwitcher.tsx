import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="card">
      <Button onClick={() => changeLanguage('de')}>de</Button>
      <Button onClick={() => changeLanguage('en')}>en</Button>
      <Button onClick={() => changeLanguage('es')}>es</Button>
    </div>
  );
}

export default LanguageSwitcher;
