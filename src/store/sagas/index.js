import { all } from "redux-saga/effects";
import { signInWatcherSaga, signUpWatcherSaga } from "./authSaga";

export default function* rootSaga() {
  yield all([signInWatcherSaga(), signUpWatcherSaga()]);
}
