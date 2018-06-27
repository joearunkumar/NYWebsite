import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import People from "@material-ui/icons/People";
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
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import image from "assets/img/bg7.jpg";
import {Auth} from "aws-amplify";
import {HelpBlock, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "components/LoaderButton";

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      isLoading: false,
      email: "",
      password: "",
      name: "",
      contactno: "+91",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      signUperrorMsg: "",
      confmErrorMsg: ""
    };
  }

  validateForm() {
    return (this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword);
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    console.log(this.state.name);
    console.log(this.state.contactno);
    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          name: this.state.name,
          address: "Address",
          gender: "Male",
          birthdate: "10/05/1990",
          phone_number: this.state.contactno
        }
      });
      this.setState({newUser});
    } catch (e) {
      this.setState({signUperrorMsg: e.message});
    }
    this.setState({isLoading: false});
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.history.push("/memberhome");
    } catch (e) {
      this.setState({confmErrorMsg: e.message});
      this.setState({isLoading: false});
    }
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(function() {
      this.setState({cardAnimaton: ""});
    }.bind(this), 700);
  }

  renderConfirmationForm() {
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
                <form onSubmit={this.handleConfirmationSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>NenjaeYezhu SignUp page</h4>
                  </CardHeader>
                  <CardBody>
                    <FormGroup controlId="confirmationCode" bsSize="large">
                      <CustomInput labelText="Confirmation Code" id="confirmationCode" formControlProps={{
                          fullWidth: true
                        }} inputProps={{
                          type: "tel",
                          value: this.state.confirmationCode,
                          onChange: this.handleChange,
                          endAdornment: (<InputAdornment position="end">
                            <Email className={classes.inputIconsColor}/>
                          </InputAdornment>)
                        }}/>
                      <HelpBlock>Please check your email for the code.</HelpBlock>
                    </FormGroup>
                    {this.state.confmErrorMsg}
                    <LoaderButton block="block" bsSize="large" disabled={!this.validateConfirmationForm()} type="submit" isLoading={this.state.isLoading} text="Verify" loadingText="Verifying…"/>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont="whiteFont"/>
      </div>
    </div>);
  }

  renderForm() {
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
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>NenjaeYezhu SignUp page</h4>
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
                    <FormGroup controlId="name" bsSize="large">
                      <CustomInput labelText="Name" id="name" formControlProps={{
                          fullWidth: true
                        }} inputProps={{
                          type: "name",
                          value: this.state.name,
                          onChange: this.handleChange,
                          endAdornment: (<InputAdornment position="end">
                            <Email className={classes.inputIconsColor}/>
                          </InputAdornment>)
                        }}/>
                    </FormGroup>
                    <FormGroup controlId="contactno" bsSize="large">
                      <CustomInput labelText="Phone No" id="contactno" formControlProps={{
                          fullWidth: true
                        }} inputProps={{
                          type: "phoneno",
                          value: this.state.contactno,
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
                    <FormGroup controlId="confirmPassword" bsSize="large">
                      <CustomInput labelText="Confirm Password" id="confirmPassword" formControlProps={{
                          fullWidth: true
                        }} inputProps={{
                          type: "password",
                          value: this.state.confirmPassword,
                          onChange: this.handleChange,
                          endAdornment: (<InputAdornment position="end">
                            <LockOutline className={classes.inputIconsColor}/>
                          </InputAdornment>)
                        }}/>
                    </FormGroup>
                    {this.state.signUperrorMsg}
                    <LoaderButton block="block" bsSize="large" disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="SignUp" loadingText="Signing up…"/>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont="whiteFont"/>
      </div>
    </div>);
  }

  render() {
    return (<div className="Signup">
      {
        this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()
      }
    </div>);
  }

}

export default withStyles(loginPageStyle)(SignUp);
