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
    DELETE_ITEM_FINISHED
} from "./types";
import history from "../../utils/history";

/////////// Api calls///////////
function fetchOwnStores(access_token) {
    return api.get("/ownstores", {
        headers: { Authorization: `Bearer ${access_token}` }
    });
}

function saveStoreApi(storeData) {
    return api.post(`/store`, {
        storeData
    });
}

function updateStoreApi(storeData) {
    return api.put(`/store/${storeData.id}`, {
        storeData
    });
}

/////// Generators ///////
// Get all stores
function* fetchAll() {
    yield put({ type: START_LOADING });

    let { data } = yield call(() => {
        return api.get("/stores");
    });
    yield put({ type: LOAD_ALL, payload: data.stores });
}

// Get user stores
function* fetchOwn() {
    yield put({ type: START_LOADING });

    const getUser = state => state.user;
    const user = yield select(getUser);

    let { data } = yield call(fetchOwnStores, user.access_token);
    yield put({ type: LOAD_ALL, payload: data.stores });
}

// Get unique store
function* fetcStore(action) {
    yield put({ type: START_LOADING });

    let { data } = yield call(() => {
        return api.get(`/store/${action.payload}`);
    }, action.payload);

    yield put({ type: LOAD_ALL, payload: [data] });
}

// Save store
function* saveStore(action) {
    yield put({ type: START_LOADING });

    let { data } = yield call(saveStoreApi, action.payload);
    history.push("/dashboard/store");
    // yield put({ type: LOAD_ALL, payload: [data] });
}

// Update store
function* updateStore(action) {
    yield put({ type: START_LOADING });

    let { status } = yield call(updateStoreApi, action.payload);
    history.push("/dashboard/store");
}

// Delete store
function* deleteStore(action) {
    yield put({ type: START_LOADING });

    let { status } = yield call(() => {
        return api.delete(`/store/${action.payload}`);
    });
    history.push("/dashboard/store");
}

function* fetchItems(action) {
    let { data } = yield call(() => {
        return api.get(`items/${action.payload}`);
    });

    yield put({ type: LOAD_ITEMS, payload: data.items });
}

function* saveItem(action) {
    var itemData = action.payload;
    yield put({ type: START_LOADING });
    let { data } = yield call(() => {
        return api.post('item', { itemData });
    });
    yield put({ type: LOAD_ITEMS, payload: [data.item] });
}

function* updateItem(action) {
    var itemData = action.payload;
    yield put({ type: START_LOADING });
    let { data } = yield call(() => {
        return api.put(`item/${itemData.id}`, { itemData });
    });
    yield put({ type: LOAD_ITEMS, payload: [data.item] });
}

function* deleteItem(action) {
    var itemId = action.payload;
    yield put({ type: START_LOADING });
    yield call(() => {
        return api.delete(`item/${itemId}`);
    });
    yield put({ type: DELETE_ITEM_FINISHED, payload: itemId });
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