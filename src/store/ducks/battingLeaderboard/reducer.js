import { fetchBattingLeaderboardData } from "./routines";
import { createReducer } from "../../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../../baseHandleActions";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const handleFetchBattingLeaderboardData = {
  ...handleTrigger(fetchBattingLeaderboardData),
  ...handleRequest(fetchBattingLeaderboardData),
  ...handleSuccess(fetchBattingLeaderboardData),
  ...handleFailure(fetchBattingLeaderboardData),
  ...handleFulfill(fetchBattingLeaderboardData),
};

export const reducer = createReducer(initialState)({
  ...handleFetchBattingLeaderboardData,
});
