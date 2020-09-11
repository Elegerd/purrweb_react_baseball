import { fetchSchoolsData, updateSchools } from "./schoolsRoutines";
import { createReducer } from "../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../baseHandleActions";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const handleFetchSchoolsData = {
  ...handleTrigger(fetchSchoolsData),
  ...handleRequest(fetchSchoolsData),
  ...handleSuccess(fetchSchoolsData),
  ...handleFailure(fetchSchoolsData),
  ...handleFulfill(fetchSchoolsData),
};

export const schoolsReducer = createReducer(initialState)({
  ...handleFetchSchoolsData,
});
