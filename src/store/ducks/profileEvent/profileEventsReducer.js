import {
  fetchProfileEventsData,
  updateProfileEvents,
} from "@ducks/profileEvent/profileEventsRoutines";
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

const handleFetchProfileEventsData = {
  ...handleTrigger(fetchProfileEventsData),
  ...handleRequest(fetchProfileEventsData),
  ...handleSuccess(fetchProfileEventsData),
  ...handleFailure(fetchProfileEventsData),
  ...handleFulfill(fetchProfileEventsData),
};

export const profileEventsReducer = createReducer(initialState)({
  ...handleFetchProfileEventsData,
});
