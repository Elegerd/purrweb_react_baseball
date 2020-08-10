import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store/configureStore";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "./routes";

const { store, persistor } = configureStore();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

render(<AppWrapper />, document.getElementById("app"));
