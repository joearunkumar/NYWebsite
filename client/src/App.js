import {LinkContainer} from "react-router-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import React, {Component, Fragment} from "react";
import {Auth} from "aws-amplify";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.jsx";

import Header from "components/Header/Header.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Idle from 'react-idle';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      userName: ""
    };
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
        var userInfo = await Auth.currentUserInfo();
        this.setState({userName: userInfo.attributes.name});
      }
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({isAuthenticating: false});
  }

  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated});
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/LandingPage");
  }
  handleSessionExpired = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/sessionExpiredPage");
  }

  handleSignUp = async event => {
    this.props.history.push("/Signup");
  }
  handleLogIn = async event => {
    this.props.history.push("/login");
  }
  handleLogIn = async event => {
    this.props.history.push("/login");
  }
  handleLandingPage = async event => {
    this.props.history.push("/LandingPage");
  }
  handleHome = async event => {
    this.props.history.push("/");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (!this.state.isAuthenticating && <div className="App">
      <Idle timeout={60000} onChange={({idle}) => {
          if (idle) {
            this.handleSessionExpired()
          }
        }}/>
      <Header color="infoColor" brand={this.state.isAuthenticated
          ? <Button onClick={this.handleLandingPage} color="transparent" target="_blank">
              Welcome {this.state.userName}
            </Button>
          : <Button onClick={this.handleHome} color="transparent" target="_blank">
            NenjaeYezhu
          </Button>} rightLinks={this.state.isAuthenticated
          ? <ListItem>
              <Button onClick={this.handleLogout} color="transparent" target="_blank">
                Logout
              </Button>
            </ListItem>
          : <Fragment>
            <Button onClick={this.handleSignUp} color="transparent" target="_blank">
              Signup
            </Button>
            <Button onClick={this.handleLogIn} color="transparent" target="_blank">
              Login
            </Button>
          </Fragment>} fixed="fixed" changeColorOnScroll={{
          height: 200,
          color: "black"
        }}/>
      <Routes childProps={childProps}/>
    </div>);
  }
}

export default withRouter(App);
