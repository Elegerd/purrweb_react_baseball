import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchPitchingGraphData } from "@ducks/pitchingGraph/pitchingGraphRoutines";
import { pitchingGraphRequest } from "@helpers/request/pitchingRequest";
import { getViewedProfile } from "@ducks/viewedProfile/viewedProfileSelector";

export function* fetchPitchingGraphDataWatcherSaga() {
  yield takeEvery(fetchPitchingGraphData.TRIGGER, fetchPitchingGraphDataFlow);
}

function* fetchPitchingGraphDataFlow({ payload }) {
  try {
    const { id } = yield select(getViewedProfile);
    yield put(fetchPitchingGraphData.request());
    const battingGraph = yield call(pitchingGraphRequest, {
      profile_id: id,
      ...payload,
    });
    yield put(fetchPitchingGraphData.success(battingGraph));
  } catch (error) {
    yield put(fetchPitchingGraphData.failure(error.message));
  } finally {
    yield put(fetchPitchingGraphData.fulfill());
  }
}
