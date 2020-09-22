import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchPitchingSummaryData } from "./routines";
import { pitchingSummaryRequest } from "@helpers/request/pitchingRequest";
import { getViewedProfile } from "@ducks/viewedProfile/selector";

export function* fetchPitchingSummaryDataWatcherSaga() {
  yield takeEvery(
    fetchPitchingSummaryData.TRIGGER,
    fetchPitchingSummaryDataFlow
  );
}

function* fetchPitchingSummaryDataFlow({ payload }) {
  try {
    const profile = yield select(getViewedProfile);
    yield put(fetchPitchingSummaryData.request());
    const pitchingSummary = yield call(pitchingSummaryRequest, profile);
    yield put(fetchPitchingSummaryData.success(pitchingSummary));
  } catch (error) {
    yield put(fetchPitchingSummaryData.failure(error.message));
  } finally {
    yield put(fetchPitchingSummaryData.fulfill());
  }
}

export default [fetchPitchingSummaryDataWatcherSaga()];
