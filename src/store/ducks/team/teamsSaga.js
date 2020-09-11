import { call, put, takeEvery } from "redux-saga/effects";
import { fetchTeamsData } from "./teamsRoutines";
import { teamsRequest } from "@helpers/request/dataRequest";

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
