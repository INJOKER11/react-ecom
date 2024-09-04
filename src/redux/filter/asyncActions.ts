import {createAsyncThunk} from "@reduxjs/toolkit";
import {TProduct, TSearchProductParams} from "../products/types";
import axios from "axios";

export const fetchProducts = createAsyncThunk<TProduct[], TSearchProductParams>(
    'products/fetchProductsStatus',
    async (params) => {
      const {sortBy, currentPage, category, order, search} = params;
      const {data} = await axios.get<TProduct[]>(`https://669ecf379a1bda368007a2e2.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

      return data;
    }
)