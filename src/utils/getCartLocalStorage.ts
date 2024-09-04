import {calcTotalPrice} from "./calcTotalPrice";
import {TCartProduct} from "../redux/cart/types";


export const getCartLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const products = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(products);
    return{
      totalPrice,
      products: products as TCartProduct[]
    }

}