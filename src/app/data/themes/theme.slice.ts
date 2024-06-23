import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ThemeState } from '@/app/data';

const INITAL_STATE: ThemeState = {
  isCollapsedSidebar: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: INITAL_STATE,
  reducers: {
    setCollapsed: (state: ThemeState, action: PayloadAction<boolean>) => {
      state.isCollapsedSidebar = action.payload;
    },
    checkWidth(_state: ThemeState) {},
  },
});

const themeReducer = themeSlice.reducer;

const { setCollapsed, checkWidth } = themeSlice.actions;

export { setCollapsed, checkWidth, themeReducer };
