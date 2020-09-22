import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducer";
import history from "@helpers/history";
import rootSaga from "./saga";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
  );
  const store = createStore(createRootReducer(history), enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
