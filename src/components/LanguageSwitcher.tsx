import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const handleChangeLanguage = async (lang: string) => {
    setIsLoading(true);
    try {
      await i18n.changeLanguage(lang);
      setSelectedLang(lang);
      document.documentElement.dir = languages.find(l => l.code === lang)?.rtl ? 'rtl' : 'ltr';
    } catch (error) {
      console.error('Language change failed:', error);
    }
    setIsLoading(false);
  };

  return (
    <select
      value={selectedLang}
      onChange={(e) => handleChangeLanguage(e.target.value)}
      disabled={isLoading}
      className="w-32 px-4 py-2 rounded border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:border-blue-500"
    >
      {languages.map((lang) => (
        <option
          key={lang.code}
          value={lang.code}
          className="flex items-center space-x-2"
        >
          {lang.flag} {lang.name}
        </option>
      ))}
      {isLoading && <option disabled>Loading...</option>}
    </select>
  );
};

export default LanguageSwitcher;