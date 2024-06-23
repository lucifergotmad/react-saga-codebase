import { createSelector } from 'reselect';

import { ThemeState } from '@/app/data';
import { RootState } from '@/app/root-state';

export const selectThemeReducer = (state: RootState): ThemeState => state.theme;

export const selectIsCollapseSidebar = createSelector(
  selectThemeReducer,
  (theme) => theme.isCollapsedSidebar,
);
