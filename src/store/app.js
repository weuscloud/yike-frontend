import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
  name: "app",
  initialState: {
    // darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    darkMode: false,
    theme: "light",
    modalVisible: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      state.theme = state.darkMode ? "dark" : "light";
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload === true ? true : false;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload === true ? true : false;
    },
  },
});

export const { setDarkMode,toggleDarkMode, setModalVisible } = appSlice.actions;
export default appSlice.reducer;
