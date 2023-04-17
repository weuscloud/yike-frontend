import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    // darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    darkMode:false,
    theme:'light',
  },
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
      state.theme=state.darkMode?"dark":"light";
    }
  },
});

export const { toggleDarkMode } = appSlice.actions;
export default appSlice.reducer

