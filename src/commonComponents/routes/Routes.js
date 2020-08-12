import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Auth from "@components/auth/Auth";
import NotFound from "@components/notFound/NotFound";
import PrivateRoute from "@commonComponents/privateRoute/PrivateRoute";
import SignIn from "@components/signIn/SignIn";
import SignUp from "@components/signUp/SignUp";
import Profile from "@components/profile/Profile";
import PropTypes from "prop-types";

const Routes = ({ auth }) => {
  return (
    <Switch>
      <PrivateRoute exact path="/profile" component={Profile} />
      {!auth ? (
        <>
          <Route
            path="/login"
            component={() => (
              <Auth>
                <SignIn />
              </Auth>
            )}
          />
          <Route
            path="/registration"
            component={() => (
              <Auth>
                <SignUp />
              </Auth>
            )}
          />
        </>
      ) : (
        <Redirect to={{ pathname: "/profile" }} />
      )}
      <PrivateRoute component={NotFound} />
    </Switch>
  );
};

Routes.propTypes = {
  auth: PropTypes.object,
};

export default Routes;
