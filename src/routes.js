import React from "react";
import { Route, Switch, Redirect } from "react-router";
import App from "@components/App";
import Auth from "@components/auth/Auth";
import NotFound from "@components/notFound/NotFound";
import RouteWithLayout from "@common_components/RouteWithLayout/RouteWithLayout";
import SignIn from "@components/signIn/SignIn";
import SignUp from "@components/signUp/SignUp";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <RouteWithLayout
        path="/login"
        layout={App}
        component={() => (
          <Auth>
            <SignIn />
          </Auth>
        )}
      />
      <RouteWithLayout
        path="/registration"
        layout={App}
        component={() => (
          <Auth>
            <SignUp />
          </Auth>
        )}
      />
      <RouteWithLayout layout={App} component={NotFound} />
    </Switch>
  );
};

export default Routes;
