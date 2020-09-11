import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchBattingGraphData } from "@ducks/battingGraph/battingGraphRoutines";
import { battingGraphRequest } from "@helpers/request/battingRequest";
import { getViewedProfile } from "@ducks/viewedProfile/viewedProfileSelector";

export function* fetchBattingGraphDataWatcherSaga() {
  yield takeEvery(fetchBattingGraphData.TRIGGER, fetchBattingGraphDataFlow);
}

function* fetchBattingGraphDataFlow({ payload }) {
  try {
    const { id } = yield select(getViewedProfile);
    yield put(fetchBattingGraphData.request());
    const battingGraph = yield call(battingGraphRequest, {
      profile_id: id,
      ...payload,
    });
    yield put(fetchBattingGraphData.success(battingGraph));
  } catch (error) {
    yield put(fetchBattingGraphData.failure(error.message));
  } finally {
    yield put(fetchBattingGraphData.fulfill());
  }
}
