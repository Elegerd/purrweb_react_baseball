import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { authReducer } from "./authReducer";
import { profileReducer } from "./profileReducer";
import { schoolsReducer } from "@reducers/schoolsReducer";
import { facilitiesReducer } from "@reducers/facilitiesReducer";
import { teamsReducer } from "@reducers/teamsReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    profile: profileReducer,
    schools: schoolsReducer,
    facilities: facilitiesReducer,
    teams: teamsReducer,
  });

export default rootReducer;
