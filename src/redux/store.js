import { configureStore } from '@reduxjs/toolkit'

import  filter  from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import products from "./slices/productsSlice"

export default configureStore({
  reducer: {
    filter,
    cart,
    products
  }
})

