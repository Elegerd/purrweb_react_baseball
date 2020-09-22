import { createRoutine } from "redux-saga-routines";
import { FETCH_SCHOOLS_DATA } from "./actions";

export const fetchSchoolsData = createRoutine(FETCH_SCHOOLS_DATA);
