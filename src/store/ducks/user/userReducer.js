import { fetchUserData } from "./userRoutines";
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

const handleFetchUserData = {
  ...handleTrigger(fetchUserData),
  ...handleRequest(fetchUserData),
  ...handleSuccess(fetchUserData),
  ...handleFailure(fetchUserData),
  ...handleFulfill(fetchUserData),
};

export const userReducer = createReducer(initialState)({
  ...handleFetchUserData,
});
