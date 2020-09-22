import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchBattingLogData } from "@ducks/battingLog/routines";
import { battingLogRequest } from "@helpers/request/battingRequest";
import { getViewedProfile } from "@ducks/viewedProfile/selector";

export function* fetchBattingLogDataWatcherSaga() {
  yield takeEvery(fetchBattingLogData.TRIGGER, fetchBattingLogDataFlow);
}

function* fetchBattingLogDataFlow({ payload }) {
  try {
    const { id } = yield select(getViewedProfile);
    yield put(fetchBattingLogData.request());
    const battingLog = yield call(battingLogRequest, {
      profile_id: id,
      count: 10,
      ...payload,
    });
    yield put(fetchBattingLogData.success(battingLog));
  } catch (error) {
    yield put(fetchBattingLogData.failure(error.message));
  } finally {
    yield put(fetchBattingLogData.fulfill());
  }
}

export default [fetchBattingLogDataWatcherSaga()];
