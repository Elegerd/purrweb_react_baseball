import { createRoutine } from "redux-saga-routines";
import { FETCH_BATTING_LEADERBOARD_DATA } from "./actions";

export const fetchBattingLeaderboardData = createRoutine(
  FETCH_BATTING_LEADERBOARD_DATA
);
