import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchPitchingLogData } from "@ducks/pitchingLog/routines";
import { pitchingLogRequest } from "@helpers/request/pitchingRequest";
import { getViewedProfile } from "@ducks/viewedProfile/selector";

export function* fetchPitchingLogDataWatcherSaga() {
  yield takeEvery(fetchPitchingLogData.TRIGGER, fetchPitchingLogDataFlow);
}

function* fetchPitchingLogDataFlow({ payload }) {
  try {
    const { id } = yield select(getViewedProfile);
    yield put(fetchPitchingLogData.request());
    const battingLog = yield call(pitchingLogRequest, {
      profile_id: id,
      count: 10,
      offset: 0,
      ...payload,
    });
    yield put(fetchPitchingLogData.success(battingLog));
  } catch (error) {
    yield put(fetchPitchingLogData.failure(error.message));
  } finally {
    yield put(fetchPitchingLogData.fulfill());
  }
}

export default [fetchPitchingLogDataWatcherSaga()];
