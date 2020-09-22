import { fetchViewedProfileData } from "./routines";
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

const handleFetchViewedProfileData = {
  ...handleTrigger(fetchViewedProfileData),
  ...handleRequest(fetchViewedProfileData),
  ...handleSuccess(fetchViewedProfileData),
  ...handleFailure(fetchViewedProfileData),
  ...handleFulfill(fetchViewedProfileData),
};

export const reducer = createReducer(initialState)({
  ...handleFetchViewedProfileData,
});
