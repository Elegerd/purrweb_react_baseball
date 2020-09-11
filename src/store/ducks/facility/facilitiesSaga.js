import { call, put, takeEvery } from "redux-saga/effects";
import { fetchFacilitiesData } from "@ducks/facility/facilitiesRoutines";
import { facilitiesRequest } from "@helpers/request/dataRequest";

export function* fetchFacilitiesDataWatcherSaga() {
  yield takeEvery(fetchFacilitiesData.TRIGGER, fetchFacilitiesDataFlow);
}

function* fetchFacilitiesDataFlow({ payload }) {
  try {
    yield put(fetchFacilitiesData.request());
    const facilities = yield call(facilitiesRequest, {});
    yield put(fetchFacilitiesData.success(facilities));
  } catch (error) {
    yield put(fetchFacilitiesData.failure(error.message));
  } finally {
    yield put(fetchFacilitiesData.fulfill());
  }
}
