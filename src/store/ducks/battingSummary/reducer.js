import { fetchBattingSummaryData } from "./routines";
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

const handleFetchBattingSummaryData = {
  ...handleTrigger(fetchBattingSummaryData),
  ...handleRequest(fetchBattingSummaryData),
  ...handleSuccess(fetchBattingSummaryData),
  ...handleFailure(fetchBattingSummaryData),
  ...handleFulfill(fetchBattingSummaryData),
};

export const reducer = createReducer(initialState)({
  ...handleFetchBattingSummaryData,
});
