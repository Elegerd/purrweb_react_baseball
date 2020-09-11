import { call, put, takeEvery, select } from "redux-saga/effects";
import { fetchProfileData, updateProfile } from "./profileRoutines";
import {
  currentProfileDataRequest,
  profileDataRequest,
  updateProfileRequest,
} from "@helpers/request/profileRequest";
import { getProfile } from "./profileSelector";
import { handleRequestError } from "@helpers/utilities";

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
    const allField = { ...profile, ...payload.profile };
    const result = {
      id: allField.id,
      first_name: allField.first_name,
      last_name: allField.last_name,
      position: allField.position,
      position2: allField.position2 || null,
      avatar: allField.avatar,
      throws_hand: allField.throws_hand,
      bats_hand: allField.bats_hand,
      biography: allField.biography || "",
      school_year: allField.school_year || null,
      feet: allField.feet,
      inches: allField.inches,
      weight: allField.weight,
      age: allField.age,
      school: allField.school || "",
      teams: allField.teams || [],
      facilities: allField.facilities || [],
    };
    const response = yield call(updateProfileRequest, result);
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
