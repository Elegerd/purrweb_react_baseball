import { createRoutine } from "redux-saga-routines";
import { FETCH_PITCHING_LOG_DATA } from "@ducks/pitchingLog/pitchingLogActions";

export const fetchPitchingLogData = createRoutine(FETCH_PITCHING_LOG_DATA);
