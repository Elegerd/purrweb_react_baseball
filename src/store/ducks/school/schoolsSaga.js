import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSchoolsData } from "./schoolsRoutines";
import { schoolsRequest } from "@helpers/request/dataRequest";

export function* fetchSchoolDataWatcherSaga() {
  yield takeEvery(fetchSchoolsData.TRIGGER, fetchSchoolDataFlow);
}

function* fetchSchoolDataFlow({ payload }) {
  try {
    yield put(fetchSchoolsData.request());
    const schools = yield call(schoolsRequest, {});
    yield put(fetchSchoolsData.success(schools));
  } catch (error) {
    yield put(fetchSchoolsData.failure(error.message));
  } finally {
    yield put(fetchSchoolsData.fulfill());
  }
}
