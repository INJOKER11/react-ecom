import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



export const fetchProducts = createAsyncThunk(
    'products/fetchProductsStatus',
    async (params) => {
      const {sortBy, currentPage, category, order, search} = params;
      const {data} = await axios.get(`https://669ecf379a1bda368007a2e2.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

      return data;
    }
)


const initialState = {
  items: [],
  state: '', // loading | success | rejected
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action){
      state.items = action.payload
    },
  },
  extraReducers:(builder) => {
    builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
          state.items = [];
        })
        .addCase(fetchProducts.fulfilled,(state,action) => {
          state.items = action.payload
          state.status = 'success';
        })
        .addCase(fetchProducts.rejected,(state) => {
          state.status = 'error';
          state.items = [];
        })
  }
})

export const selectProductsData = (state) => state.products


export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;