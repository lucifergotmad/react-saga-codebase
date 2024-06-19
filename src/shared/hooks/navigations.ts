import { useLocation } from 'react-router-dom';

export function useCheckActiveUrl() {
  const { pathname } = useLocation();

  const checkActiveUrl = (nav: string) => {
    const pathArray = pathname.split('/').filter((item) => item !== '');

    if (nav === '/' && pathArray.length < 1) return true;

    return pathArray.includes(nav.replace(/^\//, ''));
  };

  return { checkActiveUrl };
}
