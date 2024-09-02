import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  products: [],

}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const findProduct = state.products.find((obj) => obj.id === action.payload.id);

      if(findProduct){
        findProduct.count++
      }else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.products.reduce((sum, obj) => {
        return (obj.count * obj.price) + sum
      }, 0)
    },

    minusProduct(state,action) {
      const findProduct = state.products.find((obj) => obj.id === action.payload);

      if(findProduct) {
        if(findProduct.count === 1){
          state.products = state.products.filter((obj) => obj.id !== action.payload);
        }else {
          findProduct.count--
        }
      }
      state.totalPrice = state.products.reduce((sum, obj) => {
        return (obj.count * obj.price) + sum
      }, 0)
    },

    removeProduct(state, action) {
      state.products = state.products.filter((obj) => obj.id !== action.payload);

    },

    clearProducts(state) {
      state.products = [];
      state.totalPrice = 0;
    }
  }
})

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items?.find((obj) => obj.id === id)

export const { addProduct,removeProduct,clearProducts, minusProduct} = cartSlice.actions;

export default cartSlice.reducer;