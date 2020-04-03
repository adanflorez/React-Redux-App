import { all } from "redux-saga/effects";
import { watchFetchAll } from "./store/saga";
import { watchLogin } from './auth/saga';

export function* rootSaga() {
    yield all([watchFetchAll(), watchLogin()]);
}