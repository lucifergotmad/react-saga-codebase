import { useContext, useEffect } from 'react';
import { ThemeProviderContext } from '../components/theme-provider';
import { UseIsCollapsedReturnType } from './types/theme.hook.type';
import { useSelector } from 'react-redux';
import { selectIsCollapseSidebar } from '@/data/themes/theme.selector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/config/store';
import { checkWidth, setCollapsed } from '@/data/themes/theme.slice';

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
