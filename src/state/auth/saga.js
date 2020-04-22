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
  INIT_LOADER,
  FINISH_LOADER,
  SEND_PASS_EMAIL,
  SEND_CONFIRMATION_EMAIL,
} from "./types";
import history from "../../utils/history";

import Swal from "sweetalert2";

function* logIn(action) {
  try {
    yield put({ type: TRY_LOG_IN });
    let { data } = yield call(() => {
      return api.post("/login", {
        handlerEnabled: false,
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
  yield put({ type: INIT_LOADER });
  try {
    yield call(() => {
      return api.post("/usercreate", {
        handlerEnabled: true,
        userData: action.payload,
      });
    });

    history.push("/dashboard/signin");

    yield put({ type: FINISH_LOADER });
  } catch (err) {
    yield put({ type: FINISH_LOADER });
  }
}

function* sendPassEmail(action) {
  try {
    yield put({ type: INIT_LOADER });

    yield call(() => {
      return api.post("/userresetpassword", {
        handlerEnabled: true,
        userData: { email: action.payload },
      });
    });

    yield put({ type: FINISH_LOADER });
    history.push("/dashboard/signin");
  } catch {
    yield put({ type: FINISH_LOADER });
  }
}

function* sendConfirmationEmail(action) {
  try {
    yield put({ type: INIT_LOADER });
    yield call(() => {
      return api.post("/userconfirmationemail", {
        handlerEnabled: true,
        userData: action.payload.userData,
      });
    });
    yield put({ type: FINISH_LOADER });
    history.push("/dashboard/signin");
  } catch {
    yield put({ type: FINISH_LOADER });
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
  yield takeLatest(SEND_PASS_EMAIL, sendPassEmail);
  yield takeLatest(SEND_CONFIRMATION_EMAIL, sendConfirmationEmail);

  yield takeLatest(LOG_OUT, logOut);
}
