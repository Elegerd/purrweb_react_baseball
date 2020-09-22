import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchUserData } from "./routines";
import { profileNamesRequest } from "@helpers/request/profileRequest";
import { getViewedProfile } from "@ducks/viewedProfile/selector";

export function* fetchUserDataWatcherSaga() {
  yield takeEvery(fetchUserData.TRIGGER, fetchUserDataFlow);
}

function* fetchUserDataFlow({ payload }) {
  try {
    const { position } = yield select(getViewedProfile);
    yield put(fetchUserData.request());
    const users = yield call(profileNamesRequest, {
      position,
      ...payload,
    });
    yield put(fetchUserData.success(users));
  } catch (error) {
    yield put(fetchUserData.failure(error.message));
  } finally {
    yield put(fetchUserData.fulfill());
  }
}

export default [fetchUserDataWatcherSaga()];
