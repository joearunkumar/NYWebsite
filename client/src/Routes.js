import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Login from "views/LoginPage/LoginPage.jsx"
import AppliedRoute from "./components/AppliedRoute";
import Signup from "views/SignUp/SignUp.jsx";
import LandingPage from "./views/LandingPage/LandingPage.jsx";
import payumoney from "./containers/payumoney";
import SessionExpiredPage from "views/SessionExpiredPage.jsx"

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={LandingPage} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/landingPage" exact component={LandingPage} props={childProps} />
    <AppliedRoute path="/payumoney" exact component={payumoney} props={childProps} />
    <AppliedRoute path="/sessionExpiredPage" exact component={SessionExpiredPage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
