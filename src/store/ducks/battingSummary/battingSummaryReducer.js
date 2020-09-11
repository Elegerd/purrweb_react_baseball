import { fetchBattingSummaryData } from "./battingSummaryRoutines";
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

const handleFetchBattingSummaryData = {
  ...handleTrigger(fetchBattingSummaryData),
  ...handleRequest(fetchBattingSummaryData),
  ...handleSuccess(fetchBattingSummaryData),
  ...handleFailure(fetchBattingSummaryData),
  ...handleFulfill(fetchBattingSummaryData),
};

export const battingSummaryReducer = createReducer(initialState)({
  ...handleFetchBattingSummaryData,
});
