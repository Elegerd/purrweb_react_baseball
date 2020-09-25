import { call, put, takeEvery } from "redux-saga/effects";
import { fetchViewedProfileData } from "@ducks/viewedProfile/routines";
import {
  profileDataRequest,
  updateFavoriteProfileRequest,
} from "@helpers/request/profileRequest";
import { likeProfile } from "./routines";
import { handleRequestError } from "@helpers/utilities";

export function* fetchViewedProfileDataWatcherSaga() {
  yield takeEvery(fetchViewedProfileData.TRIGGER, fetchViewedProfileDataFlow);
}

export function* likeProfileWatcherSaga() {
  yield takeEvery(likeProfile.TRIGGER, likeProfileFlow);
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

export default [fetchViewedProfileDataWatcherSaga(), likeProfileWatcherSaga()];
