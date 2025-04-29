import { createSlice } from '@reduxjs/toolkit';

// export interface ThemeState {
//   mytheme: string;
// }

// :ThemeState
const initialState = {
  mytheme: 'light',
};

const themeSlice = createSlice({
  name: 'mytheme',
  initialState,
  reducers: {
    // state: ThemeState
    toggleTheme: (state) => {
      state.mytheme = state.mytheme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
