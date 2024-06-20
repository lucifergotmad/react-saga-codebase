import { IconMoon, IconSun } from '@tabler/icons-react';

import { Button } from '@/shared/components/design/button';
import { useTheme } from '@/shared/hooks/themes';
import { useEffect } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff';
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    metaThemeColor && metaThemeColor.setAttribute('content', themeColor);
  }, [theme]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <IconMoon size={24} /> : <IconSun size={24} />}
    </Button>
  );
};
