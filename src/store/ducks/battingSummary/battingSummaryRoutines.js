import { createRoutine } from "redux-saga-routines";
import { FETCH_BATTING_SUMMARY_DATA } from "./battingSummaryActions";

export const fetchBattingSummaryData = createRoutine(
  FETCH_BATTING_SUMMARY_DATA
);
