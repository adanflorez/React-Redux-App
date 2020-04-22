import {
  LOG_IN_FINISHED,
  TRY_LOG_IN,
  LOG_OUT_FINISHED,
  LOG_IN_SIGN_IN_FAILED,
  RESET_ERROR,
  INIT_LOADER,
  FINISH_LOADER,
} from "./types";

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
    case LOG_IN_SIGN_IN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        authError: action.payload,
        loading: false,
      };
    case INIT_LOADER:
      return {
        ...action.payload,
        loading: true,
      };
    case FINISH_LOADER:
      return {
        ...action.payload,
        loading: false,
      };
    case LOG_OUT_FINISHED:
      return { isLoggedIn: false, loading: false };
    case RESET_ERROR:
      return { ...state, authError: null };

    default:
      return state;
  }
};

export default authReducer;
