import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchBattingSummaryData } from "./battingSummaryRoutines";
import { battingSummaryRequest } from "@helpers/request/battingRequest";
import { getViewedProfile } from "@ducks/viewedProfile/viewedProfileSelector";

export function* fetchBattingSummaryDataWatcherSaga() {
  yield takeEvery(fetchBattingSummaryData.TRIGGER, fetchBattingSummaryDataFlow);
}

function* fetchBattingSummaryDataFlow({ payload }) {
  try {
    const profile = yield select(getViewedProfile);
    yield put(fetchBattingSummaryData.request());
    const battingSummary = yield call(battingSummaryRequest, profile);
    yield put(fetchBattingSummaryData.success(battingSummary));
  } catch (error) {
    yield put(fetchBattingSummaryData.failure(error.message));
  } finally {
    yield put(fetchBattingSummaryData.fulfill());
  }
}
