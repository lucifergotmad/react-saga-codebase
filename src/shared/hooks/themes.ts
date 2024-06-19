import { AppDispatch } from '@/config/store';
import {
  selectCurrentTheme,
  selectIsCollapseSidebar,
} from '@/data/themes/theme.selector';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  checkWidth,
  setCollapsed,
  setTheme as setThemeAction,
} from '@/data/themes/theme.slice';
import { useEffect } from 'react';

export const useTheme = () => {
  const theme = useSelector(selectCurrentTheme);
  const dispatch = useDispatch<AppDispatch>();

  const setTheme = (theme: Theme) => {
    console.log('hi hooks');
    dispatch(setThemeAction(theme));
  };

  return { theme, setTheme };
};

type UseIsCollapsedReturnType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

export const useIsCollapsed = (): UseIsCollapsedReturnType => {
  const isCollapsed = useSelector(selectIsCollapseSidebar);
  const dispatch = useDispatch();

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
