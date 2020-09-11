import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { authReducer } from "./auth/authReducer";
import { profileReducer } from "./profile/profileReducer";
import { schoolsReducer } from "./school/schoolsReducer";
import { facilitiesReducer } from "./facility/facilitiesReducer";
import { teamsReducer } from "./team/teamsReducer";
import { profileEventsReducer } from "./profileEvent/profileEventsReducer";
import { viewedProfileReducer } from "./viewedProfile/viewedProfileReducer";
import { battingSummaryReducer } from "./battingSummary/battingSummaryReducer";
import { battingGraphReducer } from "./battingGraph/battingGraphReducer";
import { battingLogReducer } from "./battingLog/battingLogReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    profile: profileReducer,
    viewedProfile: viewedProfileReducer,
    schools: schoolsReducer,
    facilities: facilitiesReducer,
    teams: teamsReducer,
    profileEvents: profileEventsReducer,
    battingSummary: battingSummaryReducer,
    battingGraph: battingGraphReducer,
    battingLog: battingLogReducer,
  });

export default rootReducer;
