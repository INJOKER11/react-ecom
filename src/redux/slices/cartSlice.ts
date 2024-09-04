import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type TCartProduct = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
}

interface ICartSliceState {
  totalPrice: number;
  products: TCartProduct[];
}

const initialState: ICartSliceState = {
  totalPrice: 0,
  products: [],

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

      state.totalPrice = state.products.reduce((sum, obj) => {
        return (obj.count * obj.price) + sum
      }, 0)
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
      state.totalPrice = state.products.reduce((sum, obj) => {
        return (obj.count * obj.price) + sum
      }, 0)
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.products.find((obj) => obj.id === id)

export const { addProduct,removeProduct,clearProducts, minusProduct} = cartSlice.actions;

export default cartSlice.reducer;