import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilterState, TSort, SortProperty} from "./types";


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

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearch } = filterSlice.actions;

export default filterSlice.reducer;