import { fetchTeamsData } from "./routines";
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

const handleFetchTeamsData = {
  ...handleTrigger(fetchTeamsData),
  ...handleRequest(fetchTeamsData),
  ...handleSuccess(fetchTeamsData),
  ...handleFailure(fetchTeamsData),
  ...handleFulfill(fetchTeamsData),
};

export const reducer = createReducer(initialState)({
  ...handleFetchTeamsData,
});
