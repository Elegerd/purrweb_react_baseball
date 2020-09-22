import { fetchProfilesData } from "./routines";
import { createReducer } from "../../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleRequest,
  handleSuccess,
  handleTrigger,
} from "../../baseHandleActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const handleFetchProfilesData = {
  ...handleTrigger(fetchProfilesData),
  ...handleRequest(fetchProfilesData),
  ...handleSuccess(fetchProfilesData),
  ...handleFailure(fetchProfilesData),
  ...handleFulfill(fetchProfilesData),
};

export const reducer = createReducer(initialState)({
  ...handleFetchProfilesData,
});
