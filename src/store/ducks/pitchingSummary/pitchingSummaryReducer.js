import { fetchPitchingSummaryData } from "./pitchingSummaryRoutines";
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

const handleFetchPitchingSummaryData = {
  ...handleTrigger(fetchPitchingSummaryData),
  ...handleRequest(fetchPitchingSummaryData),
  ...handleSuccess(fetchPitchingSummaryData),
  ...handleFailure(fetchPitchingSummaryData),
  ...handleFulfill(fetchPitchingSummaryData),
};

export const pitchingSummaryReducer = createReducer(initialState)({
  ...handleFetchPitchingSummaryData,
});
