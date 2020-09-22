import {
  fetchProfileData,
  updateProfile,
  likeProfile,
} from "@ducks/profile/routines";
import { createReducer } from "../../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleRequest,
  handleSuccess,
  handleTrigger,
} from "../../baseHandleActions";
import { signOut } from "@ducks/auth/routines";

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
  [updateProfile.FULFILL]: (state) => ({
    ...state,
    requesting: false,
    error: null,
  }),
};

const handleLikeProfile = {
  ...handleTrigger(likeProfile),
  [likeProfile.REQUEST]: (state) => ({
    ...state,
    requesting: true,
    error: null,
  }),
  [likeProfile.SUCCESS]: (state, { payload }) => ({
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
    error: null,
  }),
  ...handleFailure(likeProfile),
  [likeProfile.FULFILL]: (state) => ({
    ...state,
    requesting: false,
    error: null,
  }),
};

export const reducer = createReducer(initialState)({
  ...handleFetchProfileData,
  ...handleSignOut,
  ...handleUpdateProfile,
  ...handleLikeProfile,
});
