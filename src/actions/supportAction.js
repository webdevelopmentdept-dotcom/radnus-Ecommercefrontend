import axios from "axios";

export const submitSupportRequest = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "SUPPORT_REQUEST" });

    const { data } = await axios.post(
      "/api/v1/support",
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: "SUPPORT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "SUPPORT_FAIL",
      payload: error.response.data.message,
    });
  }
};
