import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchProfileEventsData } from "@ducks/profileEvent/profileEventsRoutines";
import { profileEventsRequest } from "@helpers/request/dataRequest";
import { getViewedProfile } from "@ducks/viewedProfile/viewedProfileSelector";

export function* fetchProfileEventsDataWatcherSaga() {
  yield takeEvery(fetchProfileEventsData.TRIGGER, fetchProfileEventsDataFlow);
}

function* fetchProfileEventsDataFlow({ payload }) {
  try {
    const profile = yield select(getViewedProfile);
    yield put(fetchProfileEventsData.request());
    const profileEvents = yield call(profileEventsRequest, {
      profile_id: profile.id,
      count: 10,
      offset: 0,
    });
    yield put(fetchProfileEventsData.success(profileEvents));
  } catch (error) {
    yield put(fetchProfileEventsData.failure(error.message));
  } finally {
    yield put(fetchProfileEventsData.fulfill());
  }
}
