import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
  name: "app",
  initialState: {
    // darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    darkMode: false,
    theme: "light",
    modalVisible: false,
    PWD_SALT: "WANGQICHENG",
    token: localStorage.getItem('token'),
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
    updateToken: (state, action) => {
      const { token, checked } = action.payload;
      if (typeof token === 'string') {
        state.token = token;
        if (checked) {
          localStorage.setItem('token', token);
        }
      } else {
        state.token = null;
        localStorage.removeItem('token');
      }
    }
  },
});

export const { setDarkMode, updateToken, toggleDarkMode, setModalVisible } = appSlice.actions;
export default appSlice.reducer;
