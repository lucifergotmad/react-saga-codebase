import { useLocation } from 'react-router-dom';

export function useCheckActiveUrl() {
  const { pathname } = useLocation();

  const checkActiveUrl = (nav: string) => {
    const normalizedNav = nav.replace(/^\//, ''); // Remove leading slash from nav
    const pathArray = pathname.split('/').filter((item) => item !== '');

    if (nav === '/' && pathArray.length === 0) return true;

    // Check if the nav path is a subpath of the current pathname
    const currentPath = pathArray.join('/');
    return currentPath.startsWith(normalizedNav);
  };

  return { checkActiveUrl };
}
