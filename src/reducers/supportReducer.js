const initialState = {
  loading: false,
  success: false,
  message: null,
  error: null,
};

export const supportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUPPORT_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "SUPPORT_SUCCESS":
      return {
        loading: false,
        success: true,
        message: action.payload,
      };

    case "SUPPORT_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "SUPPORT_RESET":
      return initialState;

    default:
      return state;
  }
};
