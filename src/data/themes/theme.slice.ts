import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const INITAL_STATE: ThemeState = {
  currentTheme: 'system',
  isCollapsedSidebar: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: INITAL_STATE,
  reducers: {
    setTheme(state: ThemeState, action: PayloadAction<Theme>) {
      state.currentTheme = action.payload;
    },
    setCollapsed(state: ThemeState, action: PayloadAction<boolean>) {
      state.isCollapsedSidebar = action.payload;
    },
    toggleCollapsed(state: ThemeState, _action: PayloadAction) {
      state.isCollapsedSidebar = !state.isCollapsedSidebar;
    },
    checkWidth(_state: ThemeState, _action: PayloadAction) {},
  },
});

const { setTheme, setCollapsed, toggleCollapsed, checkWidth } =
  themeSlice.actions;
export { setTheme, setCollapsed, toggleCollapsed, checkWidth };

export default themeSlice.reducer;
