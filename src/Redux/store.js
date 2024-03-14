import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './CartSlice'
import CategorySlice from './CategorySlice'

export default configureStore({
  reducer: {
    cart : CartSlice,
    category : CategorySlice
  }
})