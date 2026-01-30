import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  ALL_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  SLIDER_PRODUCTS_REQUEST,
  SLIDER_PRODUCTS_SUCCESS,
  SLIDER_PRODUCTS_FAIL,
} from "../constants/productConstants";

/* =========================================================
   GET ALL PRODUCTS (SEARCH / FILTER / PAGINATION)
========================================================= */
export const getProducts =
  (keyword = "", category, price = [0, 200000], ratings = 0, currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let url = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;

      if (category) {
        url += `&category=${category}`;
      }

      const { data } = await axios.get(url);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

/* =========================================================
   PRODUCT DETAILS
========================================================= */
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =========================================================
   NEW / UPDATE REVIEW
========================================================= */
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const { data } = await axios.put(
      "/api/v1/review",
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


/* =========================================================
   SLIDER PRODUCTS
========================================================= */
export const getSliderProducts = () => async (dispatch) => {
  try {
    dispatch({ type: SLIDER_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/v1/products/all");

    dispatch({
      type: SLIDER_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: SLIDER_PRODUCTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =========================================================
   ADMIN PRODUCTS
========================================================= */
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products", {
      withCredentials: true,
    });

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =========================================================
   ✅ CREATE PRODUCT (IMPORTANT FIX HERE)
========================================================= */
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // ✅ admin auth cookie
    };

    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =========================================================
   UPDATE PRODUCT
========================================================= */
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =========================================================
   DELETE PRODUCT
========================================================= */
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =========================================================
   ALL REVIEWS - ADMIN
========================================================= */
export const getAllReviews = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEWS_REQUEST });

    const { data } = await axios.get(
      "/api/v1/admin/reviews",
      { withCredentials: true }
    );

    dispatch({
      type: ALL_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEWS_FAIL,
      payload:
        error.response?.data?.message || error.message,
    });
  }
};


/* =========================================================
   DELETE REVIEW - ADMIN
========================================================= */
export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews/${reviewId}`,
      { withCredentials: true }
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload:
        error.response?.data?.message || error.message,
    });
  }
};

// ✅ Get Similar Products
export const getSimilarProducts = (category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    const { data } = await axios.get(
      `/api/v1/products?category=${category}`
    );

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


/* =========================================================
   CLEAR ERRORS
========================================================= */
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};