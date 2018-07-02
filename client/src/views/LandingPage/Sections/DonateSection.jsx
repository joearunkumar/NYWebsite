import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { LinkContainer } from "react-router-bootstrap";
import { Link, withRouter } from "react-router-dom";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Routes from "Routes";

import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";

class DonateSection extends Component {

  constructor(props) {
    super(props);
  }

  handlePayumoney = async event => {
    this.props.history.push("/payumoney");
  }

  render() {
    const {classes} = this.props;
    return (<div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Donate to our trust</h2>
          <h4 className={classes.description}></h4>
          <form>
            <div class='pm-button'>
              <center>
                <a href='https://www.payumoney.com/sandbox/paybypayumoney/#/461C266E200580B10F4C08D68DD10F00'>
                <img src='https://www.payumoney.com/media/images/payby_payumoney/new_buttons/23.png' />
                </a>
              </center>
            </div>
            <Button
              onClick={this.handlePayumoney}
              color="transparent"
              target="_blank"
            > Donate
            </Button>
          </form>
        </GridItem>
      </GridContainer>
    </div>);
  }
}

export default withRouter(withStyles(workStyle)(DonateSection));
