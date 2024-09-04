

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