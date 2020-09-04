import { fetchProfileData, updateProfile } from "@routines/profileRoutines";
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
  requesting: false,
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

const handleUpdateProfile = {
  ...handleTrigger(updateProfile),
  [updateProfile.REQUEST]: (state) => ({
    ...state,
    requesting: true,
    error: null,
  }),
  [updateProfile.SUCCESS]: ({ data, ...state }, { payload }) => {
    return {
      ...state,
      data: {
        ...data,
        ...payload,
      },
      error: null,
    };
  },
  ...handleFailure(updateProfile),
  [updateProfile.FULFILL]: (state, { payload }) => ({
    ...state,
    requesting: false,
    error: null,
  }),
};

export const profileReducer = createReducer(initialState)({
  ...handleFetchProfileData,
  ...handleSignOut,
  ...handleUpdateProfile,
});
