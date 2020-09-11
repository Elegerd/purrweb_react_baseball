import { createRoutine } from "redux-saga-routines";
import { FETCH_PATCHING_GRAPH_DATA } from "@ducks/pitchingGraph/pitchingGraphActions";

export const fetchPitchingGraphData = createRoutine(FETCH_PATCHING_GRAPH_DATA);
