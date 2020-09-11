import { fetchFacilitiesData, updateFacilities } from "./facilitiesRoutines";
import { createReducer } from "../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../baseHandleActions";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const handleFetchFacilitiesData = {
  ...handleTrigger(fetchFacilitiesData),
  ...handleRequest(fetchFacilitiesData),
  ...handleSuccess(fetchFacilitiesData),
  ...handleFailure(fetchFacilitiesData),
  ...handleFulfill(fetchFacilitiesData),
};

export const facilitiesReducer = createReducer(initialState)({
  ...handleFetchFacilitiesData,
});
