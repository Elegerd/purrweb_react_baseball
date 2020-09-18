import { createRoutine } from "redux-saga-routines";
import {
  FETCH_PROFILE_DATA,
  UPDATE_PROFILE,
  LIKE_PROFILE,
} from "./profileActions";

export const fetchProfileData = createRoutine(FETCH_PROFILE_DATA);

export const updateProfile = createRoutine(UPDATE_PROFILE);

export const likeProfile = createRoutine(LIKE_PROFILE);
