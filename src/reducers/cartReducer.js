import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

// ⭐ get user based cart
const getCartItems = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const key = user
    ? `cartItems_${user._id}`
    : "cartItems_guest";

  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];
};

const initialState = {
  cartItems: getCartItems(),
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART: {
      const item = payload;

      const isItemExist = state.cartItems.find(
        (el) => el.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === item.product ? item : el
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (el) => el.product !== payload
        ),
      };

    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
        shippingInfo: {},
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: payload,
      };

      case "LOAD_CART":
  return {
    ...state,
    cartItems: payload,
  };


    default:
      return state;
  }


};

