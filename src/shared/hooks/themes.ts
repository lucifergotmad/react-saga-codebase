import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { ThemeProviderContext, UseIsCollapsedReturnType } from '@/shared';
import { checkWidth, selectIsCollapseSidebar, setCollapsed } from '@/app/data';
import { AppDispatch } from '@/app/store';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export const useIsCollapsed = (): UseIsCollapsedReturnType => {
  const isCollapsed = useSelector(selectIsCollapseSidebar);
  const dispatch = useDispatch<AppDispatch>();

  const setIsCollapsed = (value: React.SetStateAction<boolean>) => {
    if (typeof value === 'function') {
      dispatch(setCollapsed(value(isCollapsed)));
    } else {
      dispatch(setCollapsed(value));
    }
  };

  useEffect(() => {
    dispatch(checkWidth());

    window.addEventListener('resize', () => dispatch(checkWidth()));

    return () => {
      window.removeEventListener('resize', () => dispatch(checkWidth()));
    };
  }, [dispatch]);

  return [isCollapsed, setIsCollapsed] as const;
};
