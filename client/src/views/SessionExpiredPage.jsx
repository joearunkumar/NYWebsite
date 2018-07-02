import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import AccessAlarms from "@material-ui/icons/AccessAlarms";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import SessionExpiredPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

const dashboardRoutes = [];

class SessionExpiredPage extends React.Component {
  render() {
    const {
      classes,
      ...rest
    } = this.props;
    return (<div style={{'margin-top':'4em'}}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={4}>
        <InfoArea
          title="OOPS!!.... Session has expired."
          description=""
          icon={AccessAlarms}
          iconColor="info"
          vertical
        />
            <h1></h1>
        </GridItem>
      </GridContainer>
      <Footer/>
    </div>);
  }
}

export default withStyles(SessionExpiredPageStyle)(SessionExpiredPage);
