import { sagas as authSagas } from "./auth";
import { sagas as battingGraphSagas } from "./battingGraph";
import { sagas as battingLeaderboardSagas } from "./battingLeaderboard";
import { sagas as battingLogSagas } from "./battingLog";
import { sagas as battingSummarySagas } from "./battingSummary";
import { sagas as facilitySagas } from "./facilities";
import { sagas as pitchingGraphSagas } from "./pitchingGraph";
import { sagas as pitchingLeaderboardSagas } from "./pitchingLeaderboard";
import { sagas as pitchingLogSagas } from "./pitchingLog";
import { sagas as pitchingSummarySagas } from "./pitchingSummary";
import { sagas as profileSagas } from "./profile";
import { sagas as profileEventSagas } from "./profileEvent";
import { sagas as profilesSagas } from "./profiles";
import { sagas as schoolSagas } from "./schools";
import { sagas as teamSagas } from "./teams";
import { sagas as usersSagas } from "./users";
import { sagas as viewedProfileSagas } from "./viewedProfile";

export default [
  ...authSagas,
  ...battingGraphSagas,
  ...battingLeaderboardSagas,
  ...battingLogSagas,
  ...battingSummarySagas,
  ...facilitySagas,
  ...pitchingGraphSagas,
  ...pitchingLeaderboardSagas,
  ...pitchingLogSagas,
  ...pitchingSummarySagas,
  ...profileSagas,
  ...profileEventSagas,
  ...profilesSagas,
  ...schoolSagas,
  ...teamSagas,
  ...usersSagas,
  ...viewedProfileSagas,
];
