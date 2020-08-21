import { createRoutine } from "redux-saga-routines";
import {
  FETCH_PROFILE_DATA,
  FETCH_CURRENT_PROFILE_DATA,
} from "@actions/profileActions";

export const fetchProfileData = createRoutine(FETCH_PROFILE_DATA);
