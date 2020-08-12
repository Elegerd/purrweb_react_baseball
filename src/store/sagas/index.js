import { all } from "redux-saga/effects";
import {
  signInWatcherSaga,
  signUpWatcherSaga,
  signOutWatcherSaga,
  tokenVerificationWatcherSaga,
} from "./authSaga";

export default function* rootSaga() {
  yield all([
    signInWatcherSaga(),
    signUpWatcherSaga(),
    signOutWatcherSaga(),
    tokenVerificationWatcherSaga(),
  ]);
}
