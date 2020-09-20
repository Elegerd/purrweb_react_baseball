import { fetchPitchingLeaderboardData } from "./pitchingLeaderboardRoutines";
import { createReducer } from "../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../baseHandleActions";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const handleFetchPitchingLeaderboardData = {
  ...handleTrigger(fetchPitchingLeaderboardData),
  ...handleRequest(fetchPitchingLeaderboardData),
  ...handleSuccess(fetchPitchingLeaderboardData),
  ...handleFailure(fetchPitchingLeaderboardData),
  ...handleFulfill(fetchPitchingLeaderboardData),
};

export const pitchingLeaderboardReducer = createReducer(initialState)({
  ...handleFetchPitchingLeaderboardData,
});
