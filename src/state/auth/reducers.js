import { LOG_IN_FINISHED, LOG_OUT, LOG_IN_FAILED, TRY_LOG_IN, SIGN_IN_FAILED } from "./types";

const initialState = {
  user: {
    isLoggedIn: false,
    authError: null,
    loading: false,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRY_LOG_IN:
      return { isLoggedIn: false, authError: null, loading: true };
    case LOG_IN_FINISHED:
      return {
        ...action.payload,
        isLoggedIn: true,
        authError: null,
        loading: false,
      };
    case LOG_IN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        authError: action.payload,
        loading: false,
      };
    case SIGN_IN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        authError: action.payload,
        loading: false,
      };
    case LOG_OUT:
      return { isLoggedIn: false, loading: false };

    default:
      return state;
  }
};

export default authReducer;
