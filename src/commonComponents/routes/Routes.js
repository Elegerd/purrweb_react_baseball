import React from "react";
import { Switch, Route } from "react-router";
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
      <PrivateRoute
        isAuth={!!auth}
        exact
        path={"/"}
        component={() => <h1>Root</h1>}
      />
      <PrivateRoute isAuth={!!auth} exact path="/profile" component={Profile} />
      <Route
        exact
        path="/login"
        component={() => (
          <Auth>
            <SignIn />
          </Auth>
        )}
      />
      <Route
        exact
        path="/registration"
        component={() => (
          <Auth>
            <SignUp />
          </Auth>
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

Routes.propTypes = {
  auth: PropTypes.object,
};

export default Routes;
