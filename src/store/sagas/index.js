import { all } from "redux-saga/effects";
import {
  signInWatcherSaga,
  signUpWatcherSaga,
  signOutWatcherSaga,
  tokenVerificationWatcherSaga,
} from "./authSaga";
import {
  fetchProfileDataWatcherSaga,
  updateProfileWatcherSaga,
} from "@sagas/profileSaga";
import { fetchSchoolDataWatcherSaga } from "@sagas/schoolsSaga";
import { fetchFacilitiesDataWatcherSaga } from "@sagas/facilitiesSaga";
import { fetchTeamsDataWatcherSaga } from "@sagas/teamsSaga";

export default function* rootSaga() {
  yield all([
    signInWatcherSaga(),
    signUpWatcherSaga(),
    signOutWatcherSaga(),
    tokenVerificationWatcherSaga(),
    fetchProfileDataWatcherSaga(),
    fetchSchoolDataWatcherSaga(),
    fetchFacilitiesDataWatcherSaga(),
    fetchTeamsDataWatcherSaga(),
    updateProfileWatcherSaga(),
  ]);
}
