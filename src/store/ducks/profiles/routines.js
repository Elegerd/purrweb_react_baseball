import { createRoutine } from "redux-saga-routines";
import { FETCH_PROFILES_DATA } from "./actions";

export const fetchProfilesData = createRoutine(FETCH_PROFILES_DATA);
