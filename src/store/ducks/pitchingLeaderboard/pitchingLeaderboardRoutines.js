import { createRoutine } from "redux-saga-routines";
import { FETCH_PITCHING_LEADERBOARD_DATA } from "./pitchingLeaderboardActions";

export const fetchPitchingLeaderboardData = createRoutine(
  FETCH_PITCHING_LEADERBOARD_DATA
);
