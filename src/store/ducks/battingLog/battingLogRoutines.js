import { createRoutine } from "redux-saga-routines";
import { FETCH_BATTING_LOG_DATA } from "@ducks/battingLog/battingLogActions";

export const fetchBattingLogData = createRoutine(FETCH_BATTING_LOG_DATA);
