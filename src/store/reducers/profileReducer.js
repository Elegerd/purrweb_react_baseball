import { fetchProfileData } from "@routines/profileRoutines";
import { createReducer } from "../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleRequest,
  handleSuccess,
  handleTrigger,
} from "../baseHandleActions";
import { signOut } from "@routines/authRoutines";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const handleFetchProfileData = {
  ...handleTrigger(fetchProfileData),
  ...handleRequest(fetchProfileData),
  [fetchProfileData.SUCCESS]: (state, { payload }) => ({
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
    error: null,
  }),
  ...handleFailure(fetchProfileData),
  ...handleFulfill(fetchProfileData),
};

const handleSignOut = {
  ...handleSuccess(signOut),
};

export const profileReducer = createReducer(initialState)({
  ...handleFetchProfileData,
  ...handleSignOut,
});
