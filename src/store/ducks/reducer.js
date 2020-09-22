import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer } from "./auth/reducer";
import { profileReducer } from "./profile/profileReducer";
import { profilesReducer } from "@ducks/profiles/profilesReducer";
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
import { userReducer } from "@ducks/user/userReducer";
import { pitchingLeaderboardReducer } from "@ducks/pitchingLeaderboard/pitchingLeaderboardReducer";
import { battingLeaderboardReducer } from "@ducks/battingLeaderboard/battingLeaderboardReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: reducer,
    profile: profileReducer,
    viewedProfile: viewedProfileReducer,
    profiles: profilesReducer,
    schools: schoolsReducer,
    facilities: facilitiesReducer,
    teams: teamsReducer,
    users: userReducer,
    profileEvents: profileEventsReducer,
    battingSummary: battingSummaryReducer,
    battingGraph: battingGraphReducer,
    battingLog: battingLogReducer,
    battingLeaderboard: battingLeaderboardReducer,
    pitchingSummary: pitchingSummaryReducer,
    pitchingGraph: pitchingGraphReducer,
    pitchingLog: pitchingLogReducer,
    pitchingLeaderboard: pitchingLeaderboardReducer,
  });

export default rootReducer;
