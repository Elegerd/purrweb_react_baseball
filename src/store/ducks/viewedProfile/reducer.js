import { fetchViewedProfileData } from "./routines";
import { createReducer } from "../../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../../baseHandleActions";
import { likeProfile } from "./routines";

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
  ...handleFetchViewedProfileData,
  ...handleLikeProfile,
});
