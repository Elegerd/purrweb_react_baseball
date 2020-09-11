import { createRoutine } from "redux-saga-routines";
import { FETCH_PITCHING_SUMMARY_DATA } from "@ducks/pitchingSummary/pitchingSummaryActions";

export const fetchPitchingSummaryData = createRoutine(
  FETCH_PITCHING_SUMMARY_DATA
);
