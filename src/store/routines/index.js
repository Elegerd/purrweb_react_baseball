import { createRoutine } from "redux-saga-routines";
import { SET_AUTH } from "../actions/authActions";

export const setAuth = createRoutine(SET_AUTH);
