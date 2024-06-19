import { RootState } from '@/config/root-state';
import { createSelector } from 'reselect';
import { ThemeState } from './theme.type';

export const selectThemeReducer = (state: RootState): ThemeState => state.theme;

export const selectIsCollapseSidebar = createSelector(
  selectThemeReducer,
  (theme) => theme.isCollapsedSidebar,
);
