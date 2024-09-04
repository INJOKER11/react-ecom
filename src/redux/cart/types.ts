export type TCartProduct = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
}

export interface ICartSliceState {
  totalPrice: number;
  products: TCartProduct[];
}