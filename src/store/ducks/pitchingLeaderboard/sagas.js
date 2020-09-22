import { call, put, takeEvery } from "redux-saga/effects";
import { fetchPitchingLeaderboardData } from "./routines";
import { leaderBoardPitchingRequest } from "@helpers/request/dataRequest";

export function* fetchPitchingLeaderboardWatcherSaga() {
  yield takeEvery(
    fetchPitchingLeaderboardData.TRIGGER,
    fetchPitchingLeaderboardDataFlow
  );
}

function* fetchPitchingLeaderboardDataFlow({ payload }) {
  try {
    yield put(fetchPitchingLeaderboardData.request());
    const {
      data: {
        leaderboard_pitching: { leaderboard_pitching },
      },
    } = yield call(leaderBoardPitchingRequest, payload);
    yield put(fetchPitchingLeaderboardData.success(leaderboard_pitching));
  } catch (error) {
    yield put(fetchPitchingLeaderboardData.failure(error.message));
  } finally {
    yield put(fetchPitchingLeaderboardData.fulfill());
  }
}

export default [fetchPitchingLeaderboardWatcherSaga()];
