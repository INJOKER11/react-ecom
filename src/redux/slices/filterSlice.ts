import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export enum SortProperty {
  RATING = '-rating',
  TITLE = '-title',
  PRICE = '-price',
  RATING_DESC = 'rating',
  TITLE_DESC = 'title',
  PRICE_DESC = 'price',
}

export type TSort = {
  name: string;
  sortProperty: SortProperty;
}

export interface IFilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: TSort;
}


const initialState: IFilterState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortProperty.RATING_DESC,
  }
}

const filterSlice = createSlice({
  name: 'filters',
    initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>){
      state.categoryId = action.payload

    },
    setSort(state, action: PayloadAction<TSort>){
      state.sort = action.payload
    },
    setCurrentPage(state,action: PayloadAction<number>){
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterState>){
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearch(state,action: PayloadAction<string>){
      state.searchValue = action.payload;
    }
  }
})

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearch } = filterSlice.actions;

export default filterSlice.reducer;