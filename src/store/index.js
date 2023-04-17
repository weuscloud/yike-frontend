import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app'
import themeReducer from './theme'
export default configureStore({
  reducer: {
    app: appReducer,
    theme:themeReducer,
  }
})