import { call, put, takeEvery } from "redux-saga/effects";
import { fetchBattingLeaderboardData } from "./routines";
import { leaderBoardBattingRequest } from "@helpers/request/dataRequest";

export function* fetchBattingLeaderboardWatcherSaga() {
  yield takeEvery(
    fetchBattingLeaderboardData.TRIGGER,
    fetchBattingLeaderboardDataFlow
  );
}

function* fetchBattingLeaderboardDataFlow({ payload }) {
  try {
    yield put(fetchBattingLeaderboardData.request());
    const {
      data: {
        leaderboard_batting: { leaderboard_batting },
      },
    } = yield call(leaderBoardBattingRequest, payload);
    yield put(fetchBattingLeaderboardData.success(leaderboard_batting));
  } catch (error) {
    yield put(fetchBattingLeaderboardData.failure(error.message));
  } finally {
    yield put(fetchBattingLeaderboardData.fulfill());
  }
}

export default [fetchBattingLeaderboardWatcherSaga()];
