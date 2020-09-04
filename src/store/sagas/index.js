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

export default function* rootSaga() {
  yield all([
    signInWatcherSaga(),
    signUpWatcherSaga(),
    signOutWatcherSaga(),
    tokenVerificationWatcherSaga(),
    fetchProfileDataWatcherSaga(),
    updateProfileWatcherSaga(),
  ]);
}
