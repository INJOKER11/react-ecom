export enum STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TProduct = {
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
