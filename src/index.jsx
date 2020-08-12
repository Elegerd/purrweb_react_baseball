import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "@store/configureStore";
import { ConnectedRouter } from "connected-react-router";
import history from "@helpers/history";
import App from "@components/App";

const store = configureStore();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
};

render(<AppWrapper />, document.getElementById("app"));
