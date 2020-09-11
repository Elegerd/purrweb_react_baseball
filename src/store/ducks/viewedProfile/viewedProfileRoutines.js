import { createRoutine } from "redux-saga-routines";
import { FETCH_VIEWED_PROFILE_DATA } from "@ducks/viewedProfile/viewedProfileActions";

export const fetchViewedProfileData = createRoutine(FETCH_VIEWED_PROFILE_DATA);
