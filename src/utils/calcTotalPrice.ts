import {TCartProduct} from "../redux/cart/types";

export const calcTotalPrice = (items: TCartProduct[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  },0)
}