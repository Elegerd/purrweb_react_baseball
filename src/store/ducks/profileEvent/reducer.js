import { fetchProfileEventsData } from "./routines";
import { createReducer } from "../../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../../baseHandleActions";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const handleFetchProfileEventsData = {
  ...handleTrigger(fetchProfileEventsData),
  ...handleRequest(fetchProfileEventsData),
  ...handleSuccess(fetchProfileEventsData),
  ...handleFailure(fetchProfileEventsData),
  ...handleFulfill(fetchProfileEventsData),
};

export const reducer = createReducer(initialState)({
  ...handleFetchProfileEventsData,
});
