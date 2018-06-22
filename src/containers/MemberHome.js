import React, { Component } from "react";
import "./MemberHome.css";
import { Auth } from "aws-amplify";

export default class MemberHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  async componentDidMount() {
    try {
      var userInfo = await Auth.currentUserInfo();
      this.setState({ userName: userInfo.attributes.name})
    } catch (err) {
      console.log('error fetching user info: ', err);
    }
  }

  render() {
    return (
      <div className="MemberHome">
        <div className="lander">
          <h1>Welcome {this.state.userName}</h1>
          <p></p>
        </div>
      </div>
    );
  }
}
