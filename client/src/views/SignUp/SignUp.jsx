import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import DateRange from "@material-ui/icons/DateRange";
import Home from "@material-ui/icons/Home";
import Portrait from "@material-ui/icons/Portrait";
import Info from "@material-ui/icons/Info";
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
import image from "assets/img/green_bg.png";
import {Auth} from "aws-amplify";
import {HelpBlock, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "components/LoaderButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import Datetime from "react-datetime";
import moment from 'moment'

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      isLoading: false,
      email: "",
      password: "",
      name: "",
      contactno: "+91",
      address: "",
      gender: "",
      birthdate: "",
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

  handleChangeDate = (date) => {
    console.log(date)
    if(moment.isMoment(date)){
      this.setState({
        birthdate: date.format('DD/MM/YYYY')
      })
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    console.log("Details-->");
    console.log(this.state.email);
    console.log(this.state.name);
    console.log(this.state.contactno);
    console.log(this.state.address);
    console.log(this.state.gender);
    console.log(this.state.birthdate);
    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          name: this.state.name,
          address: this.state.address,
          gender: this.state.gender,
          birthdate: this.state.birthdate,
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
      this.props.history.push("/LandingPage");
    } catch (e) {
      this.setState({confmErrorMsg: e.message});
      this.setState({isLoading: false});
    }
  }

  componentDidMount() {
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
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[this.state.cardAnimaton]}>
                <form onSubmit={this.handleConfirmationSubmit}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h4>NenjaeYezhu Confirmation Page</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={5}>
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
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        {this.state.confmErrorMsg}
                        <LoaderButton block="block" bsSize="large" disabled={!this.validateConfirmationForm()} type="submit" isLoading={this.state.isLoading} text="Verify" loadingText="Verifying…"/>
                      </GridItem>
                    </GridContainer>
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
            <GridItem xs={10} sm={10} md={10}>
              <Card className={classes[this.state.cardAnimaton]}>
                <form onSubmit={this.handleSubmit}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h4>NenjaeYezhu SignUp page</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={5}>
                        <FormGroup controlId="name" bsSize="large">
                          <CustomInput labelText="Name" id="name" formControlProps={{
                              fullWidth: true
                            }} inputProps={{
                              type: "name",
                              value: this.state.name,
                              onChange: this.handleChange,
                              endAdornment: (<InputAdornment position="end">
                                <Portrait className={classes.inputIconsColor}/>
                              </InputAdornment>)
                            }}/>
                        </FormGroup>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
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
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <FormGroup controlId="contactno" bsSize="large">
                          <CustomInput labelText="Phone No" id="contactno" formControlProps={{
                              fullWidth: true
                            }} inputProps={{
                              type: "phoneno",
                              value: this.state.contactno,
                              onChange: this.handleChange,
                              endAdornment: (<InputAdornment position="end">
                                <Phone className={classes.inputIconsColor}/>
                              </InputAdornment>)
                            }}/>
                        </FormGroup>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <FormGroup controlId="address" bsSize="large">
                          <CustomInput labelText="Address" id="address" formControlProps={{
                              fullWidth: true
                            }} inputProps={{
                              type: "address",
                              value: this.state.address,
                              onChange: this.handleChange,
                              endAdornment: (<InputAdornment position="end">
                                <Home className={classes.inputIconsColor}/>
                              </InputAdornment>)
                            }}/>
                        </FormGroup>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <GridContainer justify="center">
                          <GridItem xs={4} sm={4} md={4}>
                            <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
                              <FormControlLabel control={<Radio
                                checked = {
                                  this.state.gender === "male"
                                }
                                onChange = {
                                  this.handleChange
                                }
                                value = "male"
                                id = "gender"
                                name = "radio button enabled"
                                aria-label = "A"
                                icon = {
                                  <FiberManualRecord className={classes.radioUnchecked}/>
                                }
                                checkedIcon = {
                                  <FiberManualRecord className={classes.radioChecked}/>
                                }
                                classes = {{
                                  checked: classes.radio
                                }}
                                />} classes={{
                                  label: classes.label
                                }} label="Male"/>
                            </div>
                          </GridItem>
                          <GridItem xs={6} sm={6} md={6}>
                            <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
                              <FormControlLabel control={<Radio
                                checked = {
                                  this.state.gender === "female"
                                }
                                onChange = {
                                  this.handleChange
                                }
                                id = "gender"
                                value = "female"
                                name = "radio button enabled"
                                aria-label = "B"
                                icon = {
                                  <FiberManualRecord className={classes.radioUnchecked}/>
                                }
                                checkedIcon = {
                                  <FiberManualRecord className={classes.radioChecked}/>
                                }
                                classes = {{
                                  checked: classes.radio
                                }}
                                />} classes={{
                                  label: classes.label
                                }} label="Female"/>
                            </div>
                          </GridItem>
                          <GridItem xs={2} sm={2} md={2}>
                            <br/><br/>
                            <InputAdornment position="right">
                              <People className={classes.inputIconsColor}/>
                            </InputAdornment>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <FormGroup controlId="birthdate" bsSize="large">
                          <Datetime
                            inputProps={{ placeholder: "Date of Birth" }}
                            value={this.state.myDate}
                            timeFormat={false}
                            onChange={this.handleChangeDate}
                          />
                        </FormGroup>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
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
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
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
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <center>
                          <h4 style={{
                              color: "red"
                            }}>{this.state.signUperrorMsg}</h4>
                        </center>
                        <LoaderButton block="block" bsSize="large" disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="SignUp" loadingText="Signing up…"/>
                      </GridItem>
                    </GridContainer>
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
