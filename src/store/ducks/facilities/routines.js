import { createRoutine } from "redux-saga-routines";
import { FETCH_FACILITIES_DATA } from "./actions";

export const fetchFacilitiesData = createRoutine(FETCH_FACILITIES_DATA);
