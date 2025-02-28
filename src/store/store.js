import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "../store/reducer/authReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})