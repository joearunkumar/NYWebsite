import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
import TeamSection from "views/MemberPage/Sections/TeamSection.jsx";
import DonateSection from "views/MemberPage/Sections/DonateSection.jsx";
import {Auth} from "aws-amplify";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import SectionCarousel from "views/MemberPage/Sections/SectionCarousel.jsx";

const dashboardRoutes = [];

class MemberPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
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

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    const {
      classes,
      ...rest
    } = this.props;
    return (this.state.isAuthenticated && <div>
      <Parallax filter="filter" image={require("assets/img/white_bg.jpg")}>
        <div className={classes.container}>
          <GridContainer justify="left">
            <div className={classes.brand}>
              <h1 className={classes.title}>Welcome {this.state.userName}</h1>
            </div>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <TeamSection/>
        <SectionCarousel/>
      </div>
      <Footer/>
    </div>);
  }
}

export default withStyles(landingPageStyle)(MemberPage);
