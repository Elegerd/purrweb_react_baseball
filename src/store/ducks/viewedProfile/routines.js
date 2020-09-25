import { createRoutine } from "redux-saga-routines";
import { FETCH_VIEWED_PROFILE_DATA } from "./actions";
import { LIKE_PROFILE } from "./actions";

export const fetchViewedProfileData = createRoutine(FETCH_VIEWED_PROFILE_DATA);

export const likeProfile = createRoutine(LIKE_PROFILE);
