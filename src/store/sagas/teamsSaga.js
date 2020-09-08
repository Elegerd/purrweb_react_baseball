import { call, put, takeEvery } from "redux-saga/effects";
import { fetchTeamsData } from "@routines/teamsRoutines";
import { teamsRequest } from "@helpers/dataRequest";

export function* fetchTeamsDataWatcherSaga() {
  yield takeEvery(fetchTeamsData.TRIGGER, fetchTeamsDataFlow);
}

function* fetchTeamsDataFlow({ payload }) {
  try {
    yield put(fetchTeamsData.request());
    const teams = yield call(teamsRequest, {});
    yield put(fetchTeamsData.success(teams));
  } catch (error) {
    yield put(fetchTeamsData.failure(error.message));
  } finally {
    yield put(fetchTeamsData.fulfill());
  }
}
