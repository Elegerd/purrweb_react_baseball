import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authService } from "@services/authService";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authService.token;
      if (!currentUser) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      return <Component {...props} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.object,
};

export default PrivateRoute;
