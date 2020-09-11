import { createRoutine } from "redux-saga-routines";
import {
  FETCH_PROFILE_EVENTS_DATA,
  UPDATE_PROFILE_EVENTS,
} from "@ducks/profileEvent/profileEventsActions";

export const fetchProfileEventsData = createRoutine(FETCH_PROFILE_EVENTS_DATA);

export const updateProfileEvents = createRoutine(UPDATE_PROFILE_EVENTS);
