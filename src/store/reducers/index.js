import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { profileReducer } from "./profileReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    profile: profileReducer,
  });

export default rootReducer;
