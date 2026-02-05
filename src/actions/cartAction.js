import axios from "../axios";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

// ⭐ helper function
const getCartKey = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return user
    ? `cartItems_${user._id}`
    : "cartItems_guest";
};


// ADD TO CART
export const addItemsToCart =
  (id, quantity = 1) =>
  async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        image: data.product.images[0].url,
        price: data.product.price,
        stock: data.product.stock,
        quantity,
      },
    });

      const key = getCartKey();


    localStorage.setItem(
      key,
      JSON.stringify(getState().cart.cartItems)
    );
  };

// REMOVE FROM CART
export const removeItemsFromCart =
  (id) =>
  async (dispatch, getState) => {

    dispatch({
      type: REMOVE_FROM_CART,
      payload: id,
    });

      const key = getCartKey();


    localStorage.setItem(
      key,
      JSON.stringify(getState().cart.cartItems)
    );
  };

// EMPTY CART
export const emptyCart = () =>
  async (dispatch, getState) => {

          const key = getCartKey();


    localStorage.removeItem(key);
    localStorage.removeItem("shippingInfo");

    dispatch({ type: EMPTY_CART });
  };

// SAVE SHIPPING INFO
export const saveShippingInfo =
  (data) =>
  async (dispatch) => {

    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };



