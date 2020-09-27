import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-dropdown/assets/index.css";
import "./index.css";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "@store/configureStore";
import { ConnectedRouter } from "connected-react-router";
import history from "@helpers/history";
import Layout from "@view/layout/Layout";

const store = configureStore();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </Provider>
  );
};

render(<AppWrapper />, document.getElementById("app"));
