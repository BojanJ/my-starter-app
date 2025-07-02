import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/stores/themeStore';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return <Button onClick={toggleTheme}>Toggle to {theme === 'light' ? 'dark' : 'light'}</Button>;
};
