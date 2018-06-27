import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
//import Login from "./containers/Login";
import Login from "views/LoginPage/LoginPage.jsx"
import AppliedRoute from "./components/AppliedRoute";
//import Signup from "./containers/Signup";
import Signup from "views/SignUp/SignUp.jsx";
import MemberHome from "./containers/MemberHome";
import LandingPage from "./views/LandingPage/LandingPage.jsx";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={LandingPage} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/memberhome" exact component={LandingPage} props={childProps} />

    <AppliedRoute path="/LandingPage" exact component={LandingPage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
