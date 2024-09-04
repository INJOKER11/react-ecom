import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCartLocalStorage} from "../../utils/getCartLocalStorage";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {ICartSliceState, TCartProduct} from "./types";



const {products, totalPrice} = getCartLocalStorage();

const initialState: ICartSliceState = {
  totalPrice,
  products: products,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<TCartProduct>) {
      const findProduct = state.products.find((obj) => obj.id === action.payload.id);

      if(findProduct){
        findProduct.count++
      }else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.products)
    },

    minusProduct(state,action: PayloadAction<string>) {
      const findProduct = state.products.find((obj) => obj.id === action.payload);

      if(findProduct) {
        if(findProduct.count === 1){
          state.products = state.products.filter((obj) => obj.id !== action.payload);
        }else {
          findProduct.count--
        }
      }
      state.totalPrice = calcTotalPrice(state.products)
    },

    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((obj) => obj.id !== action.payload);

    },

    clearProducts(state) {
      state.products = [];
      state.totalPrice = 0;
    }
  }
})

export const { addProduct,removeProduct,clearProducts, minusProduct} = cartSlice.actions;

export default cartSlice.reducer;