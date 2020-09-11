import { fetchBattingGraphData } from "@ducks/battingGraph/battingGraphRoutines";
import { createReducer } from "../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../baseHandleActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const handleFetchBattingGraphData = {
  ...handleTrigger(fetchBattingGraphData),
  ...handleRequest(fetchBattingGraphData),
  ...handleSuccess(fetchBattingGraphData),
  ...handleFailure(fetchBattingGraphData),
  ...handleFulfill(fetchBattingGraphData),
};

export const battingGraphReducer = createReducer(initialState)({
  ...handleFetchBattingGraphData,
});
