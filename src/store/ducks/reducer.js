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
import { pitchingSummaryReducer } from "./pitchingSummary/pitchingSummaryReducer";
import { pitchingGraphReducer } from "@ducks/pitchingGraph/pitchingGraphReducer";
import { pitchingLogReducer } from "@ducks/pitchingLog/pitchingLogReducer";

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
    pitchingSummary: pitchingSummaryReducer,
    pitchingGraph: pitchingGraphReducer,
    pitchingLog: pitchingLogReducer,
  });

export default rootReducer;
