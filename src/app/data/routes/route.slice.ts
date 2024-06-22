import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RouteState } from '@/app/data';

const INITAL_STATE: RouteState = {
  destination: null,
};

const routeSlice = createSlice({
  name: 'navigation',
  initialState: INITAL_STATE,
  reducers: {
    navigateTo: (state: RouteState, action: PayloadAction<string | null>) => {
      state.destination = action.payload;
    },
  },
});

const routeReducer = routeSlice.reducer;

const { navigateTo } = routeSlice.actions;

export { navigateTo, routeReducer };
