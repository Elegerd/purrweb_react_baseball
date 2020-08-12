import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "@reducers/index";
import rootSaga from "@sagas/index";
import history from "@helpers/history";

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
