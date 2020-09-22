import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Auth from "@view/pages/auth/Auth";
import NotFound from "@view/pages/notFound/NotFound";
import PrivateRoute from "@hoc/privateRoute/PrivateRoute";
import SignIn from "@view/pages/auth/signIn/SignIn";
import SignUp from "@view/pages/auth/signUp/SignUp";
import Profile from "@view/pages/profile/Profile";
import Leaderboard from "@view/pages/leaderboard/Leaderboard";
import Network from "@view/pages/network/Network";
import PropTypes from "prop-types";

const Routes = ({ auth }) => {
  const isAuth = !!auth;
  return (
    <Switch>
      <PrivateRoute exact path={"/"} component={Leaderboard} />
      <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
      <PrivateRoute exact path="/network" component={Network} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute path="/profile/:id" component={Profile} />
      <Route
        exact
        path="/login"
        component={() =>
          isAuth ? (
            <Redirect to={{ pathname: "/profile" }} />
          ) : (
            <Auth>
              <SignIn />
            </Auth>
          )
        }
      />
      <Route
        exact
        path="/registration"
        component={() =>
          isAuth ? (
            <Redirect to={{ pathname: "/profile" }} />
          ) : (
            <Auth>
              <SignUp />
            </Auth>
          )
        }
      />
      <Route component={NotFound} />
    </Switch>
  );
};

Routes.propTypes = {
  auth: PropTypes.object,
};

export default Routes;
