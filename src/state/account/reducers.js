import {
  LOAD_USER_INFO,
  START_LOADING,
  STOP_LOADING,
  REMOVE_USER_INFO,
} from "./types";

const initialState = {
  loading: false,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_INFO:
      return { ...state, accounBasictInfo: action.payload, loading: false };

    case START_LOADING:
      return { ...state, loading: true };

    case STOP_LOADING:
      return { ...state, loading: false };

    case REMOVE_USER_INFO:
      return { ...state, accounBasictInfo: undefined };

    default:
      return state;
  }
};

export default accountReducer;
