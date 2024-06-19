import { RootState } from '@/config/root-state';
import { createSelector } from 'reselect';

export const selectThemeReducer = (state: RootState): ThemeState => state.theme;

export const selectCurrentTheme = createSelector(
  selectThemeReducer,
  (theme) => theme.currentTheme,
);

export const selectIsCollapseSidebar = createSelector(
  selectThemeReducer,
  (theme) => theme.isCollapsedSidebar,
);
