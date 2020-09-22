import { all } from "redux-saga/effects";

import sagas from "./ducks/sagas";

export default function* rootSaga() {
  yield all(sagas);
}
