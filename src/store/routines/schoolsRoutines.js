import { createRoutine } from "redux-saga-routines";
import { FETCH_SCHOOLS_DATA, UPDATE_SCHOOLS } from "@actions/schoolsActions";

export const fetchSchoolsData = createRoutine(FETCH_SCHOOLS_DATA);

export const updateSchools = createRoutine(UPDATE_SCHOOLS);
