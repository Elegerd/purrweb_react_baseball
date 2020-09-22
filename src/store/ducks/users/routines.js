import { createRoutine } from "redux-saga-routines";
import { FETCH_USER_DATA } from "./actions";

export const fetchUserData = createRoutine(FETCH_USER_DATA);
