import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });

export default rootReducer;
