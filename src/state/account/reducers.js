import { LOAD_USER_INFO, START_LOADING, STOP_LOADING } from "./types";

const initialState = {
  accounBasictInfo: {},
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

    default:
      return state;
  }
};

export default accountReducer;
