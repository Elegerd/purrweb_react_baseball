import { call, put, takeEvery, select } from "redux-saga/effects";
import { fetchProfileData, updateProfile } from "./profileRoutines";
import {
  currentProfileDataRequest,
  profileDataRequest,
  updateProfileRequest,
} from "@helpers/request/profileRequest";
import { getProfile } from "./profileSelector";
import {
  getRequiredProfileFields,
  handleRequestError,
} from "@helpers/utilities";

export function* fetchProfileDataWatcherSaga() {
  yield takeEvery(fetchProfileData.TRIGGER, fetchProfileDataFlow);
}

export function* updateProfileWatcherSaga() {
  yield takeEvery(updateProfile.TRIGGER, updateProfileFlow);
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
    yield put(fetchProfileData.success(profile));
  } catch (error) {
    yield put(fetchProfileData.failure(error.message));
  } finally {
    yield put(fetchProfileData.fulfill());
  }
}

function* updateProfileFlow({ payload }) {
  try {
    yield put(updateProfile.request());
    const profile = yield select(getProfile);
    const fullProfile = getRequiredProfileFields({
      ...profile,
      ...payload.profile,
    });
    const response = yield call(updateProfileRequest, fullProfile);
    yield call(handleRequestError, response);
    const {
      data: { update_profile },
    } = response;
    yield put(updateProfile.success(update_profile.profile));
    yield call(payload.callback(update_profile.profile));
  } catch (error) {
    yield put(updateProfile.failure(error.message));
  } finally {
    yield put(updateProfile.fulfill());
  }
}
