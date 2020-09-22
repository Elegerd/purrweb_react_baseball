import { call, put, takeEvery, select } from "redux-saga/effects";
import { fetchProfilesData } from "./profilesRoutines";
import { profilesRequest } from "@helpers/request/profileRequest";
import {
  getRequiredProfileFields,
  handleRequestError,
} from "@helpers/utilities";

export function* fetchProfilesDataWatcherSaga() {
  yield takeEvery(fetchProfilesData.TRIGGER, fetchProfilesDataFlow);
}

function* fetchProfilesDataFlow({ payload }) {
  try {
    yield put(fetchProfilesData.request());
    const data = yield call(profilesRequest, payload);
    yield put(fetchProfilesData.success(data));
  } catch (error) {
    yield put(fetchProfilesData.failure(error.message));
  } finally {
    yield put(fetchProfilesData.fulfill());
  }
}
