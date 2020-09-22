import { fetchPitchingLogData } from "./routines";
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

const handleFetchPitchingLogData = {
  ...handleTrigger(fetchPitchingLogData),
  ...handleRequest(fetchPitchingLogData),
  ...handleSuccess(fetchPitchingLogData),
  ...handleFailure(fetchPitchingLogData),
  ...handleFulfill(fetchPitchingLogData),
};

export const reducer = createReducer(initialState)({
  ...handleFetchPitchingLogData,
});
