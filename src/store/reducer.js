import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import * as reducers from "./ducks";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

export default rootReducer;
