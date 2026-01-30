import {
  SUBMIT_REVIEW_REQUEST,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_FAIL,
  SUBMIT_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/productConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case SUBMIT_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
      };

    case SUBMIT_REVIEW_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case SUBMIT_REVIEW_RESET:
      return {
        ...state,
        success: false,
        error: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
