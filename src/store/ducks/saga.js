import { all } from "redux-saga/effects";
import {
  signInWatcherSaga,
  signUpWatcherSaga,
  signOutWatcherSaga,
  tokenVerificationWatcherSaga,
} from "./auth/authSaga";
import {
  fetchProfileDataWatcherSaga,
  updateProfileWatcherSaga,
} from "./profile/profileSaga";
import { fetchSchoolDataWatcherSaga } from "./school/schoolsSaga";
import { fetchFacilitiesDataWatcherSaga } from "./facility/facilitiesSaga";
import { fetchTeamsDataWatcherSaga } from "./team/teamsSaga";
import { fetchProfileEventsDataWatcherSaga } from "./profileEvent/profileEventsSaga";
import { fetchViewedProfileDataWatcherSaga } from "./viewedProfile/viewedProfileSaga";
import { fetchBattingSummaryDataWatcherSaga } from "./battingSummary/battingSummarySaga";
import { fetchBattingGraphDataWatcherSaga } from "./battingGraph/battingGraphSaga";
import { fetchBattingLogDataWatcherSaga } from "./battingLog/battingLogSaga";
import { fetchPitchingSummaryDataWatcherSaga } from "./pitchingSummary/pitchingSummarySaga";
import { fetchPitchingLogDataWatcherSaga } from "./pitchingLog/pitchingLogSaga";
import { fetchPitchingGraphDataWatcherSaga } from "./pitchingGraph/pitchingGraphSaga";

export default function* rootSaga() {
  yield all([
    signInWatcherSaga(),
    signUpWatcherSaga(),
    signOutWatcherSaga(),
    tokenVerificationWatcherSaga(),
    fetchProfileDataWatcherSaga(),
    fetchViewedProfileDataWatcherSaga(),
    fetchSchoolDataWatcherSaga(),
    fetchFacilitiesDataWatcherSaga(),
    fetchTeamsDataWatcherSaga(),
    updateProfileWatcherSaga(),
    fetchProfileEventsDataWatcherSaga(),
    fetchBattingSummaryDataWatcherSaga(),
    fetchBattingGraphDataWatcherSaga(),
    fetchBattingLogDataWatcherSaga(),
    fetchPitchingSummaryDataWatcherSaga(),
    fetchPitchingGraphDataWatcherSaga(),
    fetchPitchingLogDataWatcherSaga(),
  ]);
}
