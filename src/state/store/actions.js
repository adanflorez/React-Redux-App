import {
  FETCH_ALL,
  FETCH_OWN,
  FETCH_STORE,
  SAVE_STORE,
  UPDATE_STORE,
  DELETE_STORE,
  FETCH_ITEMS,
  SAVE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM
} from "./types";
import { LOAD_ALL } from "./types";

//Stores
export const fetchAllStores = () => {
  return { type: FETCH_ALL };
};

export const fetchOwnStores = userId => {
  return { type: FETCH_OWN, payload: userId };
};

export const fetchStore = storeId => {
  return { type: FETCH_STORE, payload: storeId };
};

export const saveStore = storeData => {
  return { type: SAVE_STORE, payload: storeData };
};

export const updateStore = storeData => {
  return { type: UPDATE_STORE, payload: storeData };
};

export const deleteStore = storeId => {
  return { type: DELETE_STORE, payload: storeId };
};

export const loadAllStores = stores => {
  return { type: LOAD_ALL, payload: stores };
};

//fetchItems
export const fetchItems = storeId => {
  return { type: FETCH_ITEMS, payload: storeId };
};

export const saveItem = itemData => {
  return { type: SAVE_ITEM, payload: itemData };
};

export const updateItem = itemData => {
  return { type: UPDATE_ITEM, payload: itemData };
};

export const deleteItem = itemId => {
  return { type: DELETE_ITEM, payload: itemId };
};
