import api from "../../api/api";
import { takeLatest, put, call } from "redux-saga/effects";
import {
  LOG_IN,
  LOG_IN_FINISHED,
  SIGN_UP,
  LOG_IN_FAILED,
  TRY_LOG_IN,
} from "./types";
import history from "../../utils/history";

function* logIn(action) {
  try {
    yield put({ type: TRY_LOG_IN });
    let { data } = yield call(() => {
      return api
        .post("/login", { handlerEnabled: true, userData: action.payload.userData })
        .catch((err) => {
          throw err.response.data.message;
        });
    });

    localStorage.setItem("user", JSON.stringify(data));

    if (action.payload.comefrom) {
      history.push(action.payload.comefrom);
    } else {
      history.push("/");
    }

    yield put({ type: LOG_IN_FINISHED, payload: data });
  } catch (err) {}
}

function* singUp(action) {
  try {
    let { data } = yield call(() => {
      return api
        .post("/usercreate", { handlerEnabled: true, userData: action.payload })
        .catch((err) => {
          throw err.response.data.message;
        });
    });

    yield put({
      type: LOG_IN,
      payload: { userData:{username: data.username, password: data.password }},
    });
  } catch (err) {}
}

export function* watchLogin() {
  yield takeLatest(LOG_IN, logIn);
  yield takeLatest(SIGN_UP, singUp);
}
