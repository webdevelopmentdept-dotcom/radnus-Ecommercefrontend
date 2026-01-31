import axios from "../axios";import {
  SUBMIT_REVIEW_REQUEST,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_FAIL,
} from "../constants/productConstants";
// ================= SUBMIT REVIEW (AFTER DELIVERY) =================
export const submitDeliveredReview = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "/api/v1/review/delivered",
      formData,
      config
    );

    dispatch({
      type: SUBMIT_REVIEW_SUCCESS,
      payload: data.message, // or data.success
    });

  } catch (error) {
    dispatch({
      type: SUBMIT_REVIEW_FAIL,
      payload:
        error.response?.data?.message ||
        "Review submission failed",
    });
  }
};

