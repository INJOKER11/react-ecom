import {createSlice, PayloadAction, Draft} from "@reduxjs/toolkit";
import {STATUS, TProduct} from "./types";
import {fetchProducts} from "../filter/asyncActions";







interface IProductsState {
  items: TProduct[];
  status: STATUS;
}


const initialState: IProductsState = {
  items: [],
  status: STATUS.LOADING, // loading | success | rejected
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TProduct[]>){
      state.items = action.payload
    },
  },
  extraReducers:(builder) => {
    builder
        .addCase(fetchProducts.pending, (state: Draft<IProductsState>) => {
          state.status = STATUS.LOADING;
          state.items = [];
        })
        .addCase(fetchProducts.fulfilled,(state: Draft<IProductsState>, action: PayloadAction<TProduct[]>) => {
          state.items = action.payload
          state.status = STATUS.SUCCESS;
        })
        .addCase(fetchProducts.rejected,(state: Draft<IProductsState>) => {
          state.status = STATUS.ERROR;
          state.items = [];
        })
  }
})


export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;