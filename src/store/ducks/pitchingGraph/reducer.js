import { fetchPitchingGraphData } from "./routines";
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

const handleFetchPitchingGraphData = {
  ...handleTrigger(fetchPitchingGraphData),
  ...handleRequest(fetchPitchingGraphData),
  ...handleSuccess(fetchPitchingGraphData),
  ...handleFailure(fetchPitchingGraphData),
  ...handleFulfill(fetchPitchingGraphData),
};

export const reducer = createReducer(initialState)({
  ...handleFetchPitchingGraphData,
});
