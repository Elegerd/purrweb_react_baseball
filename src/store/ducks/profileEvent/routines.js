import { createRoutine } from "redux-saga-routines";
import { FETCH_PROFILE_EVENTS_DATA } from "./actions";

export const fetchProfileEventsData = createRoutine(FETCH_PROFILE_EVENTS_DATA);
