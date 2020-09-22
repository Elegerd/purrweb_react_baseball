import { call, put, takeEvery } from "redux-saga/effects";
import {
  signIn,
  signUp,
  signOut,
  tokenVerification,
} from "@ducks/auth/routines";
import { fetchProfileData } from "@ducks/profile/routines";
import {
  signInRequest,
  signUpRequest,
  signOutRequest,
  tokenVerificationRequest,
} from "@helpers/request/authRequest";
import { authService } from "@services/authService";
import history from "@helpers/history";

export function* signInWatcherSaga() {
  yield takeEvery(signIn.TRIGGER, signInFlow);
}

export function* signUpWatcherSaga() {
  yield takeEvery(signUp.TRIGGER, signUpFlow);
}

export function* signOutWatcherSaga() {
  yield takeEvery(signOut.TRIGGER, signOutFlow);
}

export function* tokenVerificationWatcherSaga() {
  yield takeEvery(tokenVerification.TRIGGER, tokenVerificationFlow);
}

function* signInFlow({ payload }) {
  try {
    yield put(signIn.request());
    const {
      data: { data },
      headers,
    } = yield call(signInRequest, payload);
    yield call(authService.setToken, headers);
    yield put(signIn.success(data));
    yield put(fetchProfileData());
    yield call(history.push, "/profile");
  } catch (error) {
    yield put(signIn.failure(error.message));
  } finally {
    yield put(signIn.fulfill());
  }
}

function* signUpFlow({ payload }) {
  try {
    yield put(signUp.request());
    const {
      data: { data },
      headers,
    } = yield call(signUpRequest, payload);
    yield call(authService.setToken, headers);
    yield put(signUp.success(data));
    yield put(fetchProfileData());
    yield call(history.push, "/profile");
  } catch (error) {
    yield put(signUp.failure(error.message));
  } finally {
    yield put(signUp.fulfill());
  }
}

function* tokenVerificationFlow({ payload }) {
  try {
    yield put(tokenVerification.request());
    const {
      data: { data },
    } = yield call(tokenVerificationRequest, payload);
    yield put(tokenVerification.success(data));
    yield put(fetchProfileData());
  } catch (error) {
    yield put(tokenVerification.failure(error.message));
  } finally {
    yield put(tokenVerification.fulfill());
  }
}

function* signOutFlow({ payload }) {
  try {
    yield put(signOut.request());
    yield call(signOutRequest, payload);
    yield put(signOut.success(null));
    yield call(history.push, "/login");
  } catch (error) {
    yield put(signOut.failure(error.message));
  } finally {
    yield put(signOut.fulfill());
  }
}

export default [
  signUpWatcherSaga(),
  signInWatcherSaga(),
  signOutWatcherSaga(),
  tokenVerificationWatcherSaga(),
];
