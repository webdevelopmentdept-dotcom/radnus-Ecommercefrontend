import axios from "../axios";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";

// ⭐ Add To Wishlist
export const addToWishlist = (id) => async (dispatch, getState) => {

  const { data } = await axios.get(`/api/v1/product/${id}`);
  const product = data.product;

  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      product: product._id,
      productData: product
    },
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};



// ⭐ Remove From Wishlist
export const removeFromWishlist = (id) => async (dispatch, getState) => {

  dispatch({
    type: REMOVE_FROM_WISHLIST,
    payload: id,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};
