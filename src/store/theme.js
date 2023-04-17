import { createSlice } from '@reduxjs/toolkit';

const light = {
  bgColor: '#fff',
  primaryColor: '#f5f5f5',
  textColor:'#001529',
  // 其它所需颜色
};

const dark = {
  bgColor: '#001529',
  primaryColor: '#f5f5f5',
  textColor: '#ffffffa6',
  // 其它所需颜色
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    light,
    dark
  },
  reducers: {
  },
});

//export const { toggleDarkMode,toggleSearching } = themeSlice.actions;
export default themeSlice.reducer

