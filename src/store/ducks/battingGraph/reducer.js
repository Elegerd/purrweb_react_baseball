import { fetchBattingGraphData } from "@ducks/battingGraph/routines";
import { createReducer } from "../../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../../baseHandleActions";

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

export const reducer = createReducer(initialState)({
  ...handleFetchBattingGraphData,
});
