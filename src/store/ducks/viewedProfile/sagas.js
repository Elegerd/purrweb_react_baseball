import { call, put, takeEvery } from "redux-saga/effects";
import { fetchViewedProfileData } from "@ducks/viewedProfile/routines";
import { profileDataRequest } from "@helpers/request/profileRequest";

export function* fetchViewedProfileDataWatcherSaga() {
  yield takeEvery(fetchViewedProfileData.TRIGGER, fetchViewedProfileDataFlow);
}

function* fetchViewedProfileDataFlow({ payload }) {
  try {
    yield put(fetchViewedProfileData.request());
    const {
      data: { profile },
    } = yield call(profileDataRequest, payload);
    yield put(fetchViewedProfileData.success(profile));
  } catch (error) {
    yield put(fetchViewedProfileData.failure(error.message));
  } finally {
    yield put(fetchViewedProfileData.fulfill());
  }
}

export default [fetchViewedProfileDataWatcherSaga()];
