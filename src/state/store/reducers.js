import {
  LOAD_ALL,
  START_LOADING,
  LOAD_ITEMS,
  DELETE_ITEM_FINISHED,
} from "./types";
import * as _ from "lodash";

const initialState = {
  stores: {
    list: [],
    pagination: {
      page: 1,
      pages:0
    },
  },
  loading: false,
  currentItems: [],
};

const storeReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOAD_ALL:
      return { ...state, stores: action.payload, loading: false };
    case LOAD_ITEMS:
      let items = action.payload;
      if (items.length != 1) {
        return { ...state, currentItems: action.payload, loading: false };
      } else {
        let finalItems = state.currentItems;
        if (_.find(finalItems, ["id", +items[0].id])) {
          let final = finalItems.map((item) => {
            if (item.id == items[0].id) {
              item = items[0];
            }
            return item;
          });
          return { ...state, currentItems: final, loading: false };
        } else {
          return { ...state, currentItems: action.payload, loading: false };
        }
      }

    case START_LOADING:
      return { ...state, loading: true };

    case DELETE_ITEM_FINISHED:
      return {
        ...state,
        currentItems: _.dropRightWhile(state.currentItems, {
          id: action.payload,
        }),
        loading: false,
      };

    default:
      return state;
  }
};

export default storeReducer;
