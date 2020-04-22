import { takeLatest, call, put } from "redux-saga/effects";
import api from "../../api/api";
import history from "../../utils/history";

import {
  GET_USER_INFO,
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
  START_LOADING,
  LOAD_USER_INFO,
  STOP_LOADING,
  REMOVE_USER_INFO
} from "./types";

import { LOG_IN_FINISHED, LOG_OUT } from "../auth/types";

function* getUserInfo() {
  try {
    yield put({ type: START_LOADING });
    let { data } = yield call(() => {
      return api.get("user", { handlerEnabled: true });
    });

    yield put({ type: LOAD_USER_INFO, payload: data });
  } catch {
    yield put({ type: STOP_LOADING });
  }
}

function* changeName(action) {
  try {
    yield put({ type: START_LOADING });
    yield call(() => {
      return api.put("username", {
        handlerEnabled: true,
        userName: action.payload,
      });
    });

    let user = JSON.parse(localStorage.getItem("user"));
    user.username = action.payload;

    localStorage.setItem("user", JSON.stringify(user));

    yield put({ type: LOG_IN_FINISHED, payload: user });

    yield put({ type: STOP_LOADING });
  } catch {
    yield put({ type: STOP_LOADING });
  }
}

function* changeEmail(action) {
  try {
    yield put({ type: START_LOADING });
    yield call(() => {
      return api.put("useremail", {
        handlerEnabled: true,
        userEmail: action.payload,
      });
    });

    yield put({ type: REMOVE_USER_INFO });
    yield put({ type: LOG_OUT });

    yield put({ type: STOP_LOADING });
  } catch {
    yield put({ type: STOP_LOADING });
  }
}

function* changePassword(action) {
  try {
    yield put({ type: START_LOADING });
    yield call(() => {
      return api.put("userpassword", {
        handlerEnabled: true,
        currentPassword: action.payload.currentpassword,
        newPassword: action.payload.newpassword,
      });
    });
    history.push("/dashboard/account/basicinfo");
    yield put({ type: STOP_LOADING });
  } catch {
    yield put({ type: STOP_LOADING });
  }
}

function* deleteAccount() {
  try {
    yield put({ type: START_LOADING });
    yield call(() => {
      return api.delete("user", { handlerEnabled: true });
    });

    yield put({ type: STOP_LOADING });
    yield put({ type: LOG_OUT });
  } catch {
    yield put({ type: STOP_LOADING });
  }
}

export function* watchAccount() {
  yield takeLatest(GET_USER_INFO, getUserInfo);
  yield takeLatest(CHANGE_NAME, changeName);
  yield takeLatest(CHANGE_EMAIL, changeEmail);
  yield takeLatest(CHANGE_PASSWORD, changePassword);
  yield takeLatest(DELETE_ACCOUNT, deleteAccount);
}
