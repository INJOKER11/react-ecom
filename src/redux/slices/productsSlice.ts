import {createSlice, createAsyncThunk, PayloadAction, Draft} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";


export enum STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type TProduct = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: number[];
  size: number[];
  count: number;
}

export type TSearchProductParams = {
  sortBy: string;
  currentPage: number;
  category: string;
  order: string;
  search: string;
}

export const fetchProducts = createAsyncThunk<TProduct[], TSearchProductParams>(
    'products/fetchProductsStatus',
    async (params) => {
      const {sortBy, currentPage, category, order, search} = params;
      const {data} = await axios.get<TProduct[]>(`https://669ecf379a1bda368007a2e2.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

      return data;
    }
)



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

export const selectProductsData = (state: RootState) => state.products


export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;