import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import {Auth} from "aws-amplify";
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import image from "assets/img/bg8.png";
import LoaderButton from "components/LoaderButton";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      errorMsg: "",
      cardAnimaton: "cardHidden"
    };
  }

  validateForm() {
    console.log(this.state.email)
    console.log(this.state.password)
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    console.log("insdie handleChange");
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    console.log("inside handle Submit");
    event.preventDefault();
    this.setState({isLoading: true});
    try {
      await Auth.signIn(this.state.email, this.state.password).then(user => console.log(user));
      this.props.userHasAuthenticated(true);
      this.props.history.push("/LandingPage");
    } catch (e) {
      // if(e.message == "User is not confirmed.") {
      //   this.setState({ errorMsg: e.message });
      // }
      this.setState({errorMsg: e.message});
      this.setState({isLoading: false});
    }
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(function() {
      this.setState({cardAnimaton: ""});
    }.bind(this), 700);
  }
  render() {
    const {
      classes,
      ...rest
    } = this.props;
    return (<div>
      <Header absolute="absolute" color="transparent" brand="Material Kit React" rightLinks={<HeaderLinks />} {...rest}/>
      <div className={classes.pageHeader} style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[this.state.cardAnimaton]}>
                <form onSubmit={this.handleSubmit}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h4>Login to NenjaeYezhu</h4>
                  </CardHeader>
                  <CardBody>
                    <FormGroup controlId="email" bsSize="large">
                      <CustomInput labelText="Email" id="email" formControlProps={{
                          fullWidth: true
                        }} inputProps={{
                          type: "email",
                          value: this.state.email,
                          onChange: this.handleChange,
                          endAdornment: (<InputAdornment position="end">
                            <Email className={classes.inputIconsColor}/>
                          </InputAdornment>)
                        }}/>
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                      <CustomInput labelText="Password" id="password" formControlProps={{
                          fullWidth: true
                        }} inputProps={{
                          type: "password",
                          value: this.state.password,
                          onChange: this.handleChange,
                          endAdornment: (<InputAdornment position="end">
                            <LockOutline className={classes.inputIconsColor}/>
                          </InputAdornment>)
                        }}/>
                    </FormGroup>
                    {this.state.errorMsg}
                    <LoaderButton block="block" bsSize="large" disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Login" loadingText="Logging in…"/>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>);
  }
}

export default withStyles(loginPageStyle)(LoginPage);
