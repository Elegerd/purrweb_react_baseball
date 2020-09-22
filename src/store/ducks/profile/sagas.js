import { call, put, takeEvery, select } from "redux-saga/effects";
import { fetchProfileData, likeProfile, updateProfile } from "./routines";
import {
  currentProfileDataRequest,
  profileDataRequest,
  updateFavoriteProfileRequest,
  updateProfileRequest,
} from "@helpers/request/profileRequest";
import { getProfile } from "./selector";
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

export function* likeProfileWatcherSaga() {
  yield takeEvery(likeProfile.TRIGGER, likeProfileFlow);
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

function* likeProfileFlow({ payload }) {
  try {
    yield put(likeProfile.request());
    const response = yield call(updateFavoriteProfileRequest, payload);
    yield call(handleRequestError, response);
    const {
      data: { update_favorite_profile },
    } = response;
    yield put(
      likeProfile.success({ favorite: update_favorite_profile.favorite })
    );
  } catch (error) {
    yield put(likeProfile.failure(error.message));
  } finally {
    yield put(likeProfile.fulfill());
  }
}

export default [
  fetchProfileDataWatcherSaga(),
  updateProfileWatcherSaga(),
  likeProfileWatcherSaga(),
];
