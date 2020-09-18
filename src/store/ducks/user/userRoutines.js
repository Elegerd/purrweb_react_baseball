import { createRoutine } from "redux-saga-routines";
import { FETCH_USER_DATA } from "./userActions";

export const fetchUserData = createRoutine(FETCH_USER_DATA);
