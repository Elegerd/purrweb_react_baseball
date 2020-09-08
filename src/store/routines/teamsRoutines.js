import { createRoutine } from "redux-saga-routines";
import { FETCH_TEAMS_DATA, UPDATE_TEAMS } from "@actions/teamsActions";

export const fetchTeamsData = createRoutine(FETCH_TEAMS_DATA);

export const updateTeams = createRoutine(UPDATE_TEAMS);
