import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../features/auth/authSlice'
import  productsSlice  from '../features/auth/productSlice' 

export const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    products : productsSlice,
  },
})