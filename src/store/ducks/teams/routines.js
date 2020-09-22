import { createRoutine } from "redux-saga-routines";
import { FETCH_TEAMS_DATA } from "./actions";

export const fetchTeamsData = createRoutine(FETCH_TEAMS_DATA);
