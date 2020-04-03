import api from "../../api/api";
import { takeLatest, put, call } from "redux-saga/effects";
import { LOG_IN, LOG_IN_FINISHED, SIGN_UP, LOG_IN_FAILED, TRY_LOG_IN } from "./types";
import history from '../../utils/history';

function* logIn(action) {
  try {
    yield put({ type: TRY_LOG_IN});
    let { data } = yield call(() => {
      return api.post("/login", action.payload);
    });
    localStorage.setItem("user", JSON.stringify(data));
    history.push('/');
    yield put({ type: LOG_IN_FINISHED, payload: data });
  } catch {
    yield put({ type: LOG_IN_FAILED, payload: "Error al inicar sesion" });
  }
}

function* singUp(action) {
  try {
      console.log("signup");
    let { data } = yield call(() => {
      return api.post("/usercreate", action.payload);
    });
    console.log(data);
    yield put({ type: LOG_IN, payload: {username:data.username, password:data.password} });
  } catch {}
}

export function* watchLogin() {
  yield takeLatest(LOG_IN, logIn);
  yield takeLatest(SIGN_UP, singUp);
}
