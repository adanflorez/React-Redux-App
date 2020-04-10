import api from "../../api/api";
import { takeLatest, put, call, select, delay } from "redux-saga/effects";
import {
  FETCH_ALL,
  LOAD_ALL,
  FETCH_OWN,
  FETCH_STORE,
  SAVE_STORE,
  UPDATE_STORE,
  DELETE_STORE,
  START_LOADING,
  FETCH_ITEMS,
  LOAD_ITEMS,
  SAVE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  DELETE_ITEM_FINISHED,
} from "./types";
import history from "../../utils/history";

/////// Generators ///////
// Get all stores
function* fetchAll() {
  try {
    yield put({ type: START_LOADING });

    let { data } = yield call(() => {
      return api.get("/stores", { handlerEnabled: true });
    });
    yield put({ type: LOAD_ALL, payload: data.stores });
  } catch (err) {}
}

// Get user stores
function* fetchOwn() {
  try {
    yield put({ type: START_LOADING });

    const getUser = (state) => state.user;
    const user = yield select(getUser);

    let { data } = yield call(() => {
      return api.get("/ownstores", {
        handlerEnabled: true,
      });
    });
    yield put({ type: LOAD_ALL, payload: data.stores });
  } catch (err) {}
}

// Get unique store
function* fetcStore(action) {
  try {
    yield put({ type: START_LOADING });

    let { data } = yield call(() => {
      return api.get(`/store/${action.payload}`, { handlerEnabled: true });
    }, action.payload);

    yield put({ type: LOAD_ALL, payload: [data] });
  } catch (err) {}
}

// Save store
function* saveStore(action) {
  try {
    yield put({ type: START_LOADING });

    let { data } = yield call(() => {
      return api.post(`/store`, {
        handlerEnabled: true,
        storeData: action.payload,
      });
    });
    history.push("/dashboard/store");
  } catch (err) {}
}

// Update store
function* updateStore(action) {
  try {
    yield put({ type: START_LOADING });

    let { status } = yield call(() => {
      return api.put(`/store/${action.payload.id}`, {
        handlerEnabled: true,
        storeData: action.payload,
      });
    });
    history.push("/dashboard/store");
  } catch (err) {}
}

// Delete store
function* deleteStore(action) {
  try {
    yield put({ type: START_LOADING });

    let { status } = yield call(() => {
      return api.delete(`/store/${action.payload}`, { handlerEnabled: true });
    });
    history.push("/dashboard/store");
  } catch (err) {}
}

function* fetchItems(action) {
  try {
    let { data } = yield call(() => {
      return api.get(`items/${action.payload}`, { handlerEnabled: true });
    });

    yield put({ type: LOAD_ITEMS, payload: data.items });
  } catch (err) {}
}

function* saveItem(action) {
  try {
    var itemData = action.payload;

    yield put({ type: START_LOADING });
    let { data } = yield call(() => {
      return api.post("item", { handlerEnabled: true, itemData });
    });
    yield put({ type: LOAD_ITEMS, payload: [data.item] });
  } catch (err) {}
}

function* updateItem(action) {
  try {
    var itemData = action.payload;
    yield put({ type: START_LOADING });
    let { data } = yield call(() => {
      return api.put(`item/${itemData.id}`, { handlerEnabled: true, itemData });
    });
    yield put({ type: LOAD_ITEMS, payload: [data.item] });
  } catch (err) {}
}

function* deleteItem(action) {
  try {
    var itemId = action.payload;

    yield put({ type: START_LOADING });
    yield call(() => {
      return api.delete(`item/${itemId}`, { handlerEnabled: true });
    });
    yield put({ type: DELETE_ITEM_FINISHED, payload: itemId });
  } catch (err) {}
}

export function* watchFetchAll() {
  //Stores
  yield takeLatest(FETCH_ALL, fetchAll);
  yield takeLatest(FETCH_OWN, fetchOwn);
  yield takeLatest(FETCH_STORE, fetcStore);
  yield takeLatest(SAVE_STORE, saveStore);
  yield takeLatest(UPDATE_STORE, updateStore);
  yield takeLatest(DELETE_STORE, deleteStore);

  //Items
  yield takeLatest(FETCH_ITEMS, fetchItems);
  yield takeLatest(SAVE_ITEM, saveItem);
  yield takeLatest(UPDATE_ITEM, updateItem);
  yield takeLatest(DELETE_ITEM, deleteItem);
}
