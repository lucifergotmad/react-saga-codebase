import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NavigationState } from './navigation.type';

const INITAL_STATE: NavigationState = {
  destination: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: INITAL_STATE,
  reducers: {
    navigateTo: (
      state: NavigationState,
      action: PayloadAction<string | null>,
    ) => {
      state.destination = action.payload;
    },
  },
});

const { navigateTo } = navigationSlice.actions;

export { navigateTo };

export default navigationSlice.reducer;
