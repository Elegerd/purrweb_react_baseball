import { fetchBattingLogData } from "@ducks/battingLog/routines";
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

const handleFetchBattingLogData = {
  ...handleTrigger(fetchBattingLogData),
  ...handleRequest(fetchBattingLogData),
  ...handleSuccess(fetchBattingLogData),
  ...handleFailure(fetchBattingLogData),
  ...handleFulfill(fetchBattingLogData),
};

export const reducer = createReducer(initialState)({
  ...handleFetchBattingLogData,
});
