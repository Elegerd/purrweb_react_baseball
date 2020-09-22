import { fetchSchoolsData } from "./routines";
import { createReducer } from "../../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../../baseHandleActions";

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

export const reducer = createReducer(initialState)({
  ...handleFetchSchoolsData,
});
