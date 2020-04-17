import api from "../../api/api";
import { takeLatest, put, call } from "redux-saga/effects";
import {
  LOG_IN,
  LOG_IN_FINISHED,
  SIGN_UP,
  TRY_LOG_IN,
  LOG_OUT,
  LOG_OUT_FINISHED,
  LOG_IN_SIGN_IN_FAILED,
} from "./types";
import history from "../../utils/history";

function* logIn(action) {
  try {
    yield put({ type: TRY_LOG_IN });
    let { data } = yield call(() => {
      return api.post("/login", {
        handlerEnabled: true,
        userData: action.payload.userData,
      });
    });

    localStorage.setItem("user", JSON.stringify(data));

    if (action.payload.comefrom) {
      history.push(action.payload.comefrom);
    } else {
      history.push("/");
    }

    yield put({ type: LOG_IN_FINISHED, payload: data });
  } catch (err) {
    yield put({ type: LOG_IN_SIGN_IN_FAILED, payload: err.message });
  }
}

function* singUp(action) {
  yield put({ type: TRY_LOG_IN });
  try {
    let { data } = yield call(() => {
      return api.post("/usercreate", {
        userData: action.payload,
      });
    });

    yield put({
      type: LOG_IN,
      payload: {
        userData: { username: data.username, password: data.password },
      },
    });
  } catch (err) {
    yield put({ type: LOG_IN_SIGN_IN_FAILED, payload: err.message });
  }
}

function* logOut() {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
  history.push("/dashboard/home");
  yield put({ type: LOG_OUT_FINISHED });
}

export function* watchLogin() {
  yield takeLatest(LOG_IN, logIn);
  yield takeLatest(SIGN_UP, singUp);
  yield takeLatest(LOG_OUT, logOut);
}
