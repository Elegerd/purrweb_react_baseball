import { createRoutine } from "redux-saga-routines";
import { FETCH_FACILITIES_DATA, UPDATE_FACILITIES } from "./facilitiesActions";

export const fetchFacilitiesData = createRoutine(FETCH_FACILITIES_DATA);

export const updateFacilities = createRoutine(UPDATE_FACILITIES);
