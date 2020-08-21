import { call, put, takeEvery } from "redux-saga/effects";
import { fetchProfileData } from "@routines/profileRoutines";
import {
  currentProfileDataRequest,
  profileDataRequest,
} from "@helpers/dataRequest";

export function* fetchProfileDataWatcherSaga() {
  yield takeEvery(fetchProfileData.TRIGGER, fetchProfileDataFlow);
}

function* fetchProfileDataFlow({ payload }) {
  try {
    yield put(fetchProfileData.request());
    const {
      data: { current_profile: currentProfile },
    } = yield call(currentProfileDataRequest);
    const {
      data: { profile },
    } = yield call(profileDataRequest, currentProfile);
    yield put(fetchProfileData.success({ currentProfile, profile }));
  } catch (error) {
    yield put(fetchProfileData.failure(error.message));
  } finally {
    yield put(fetchProfileData.fulfill());
  }
}
