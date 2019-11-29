import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
import { SIGNUP_USER } from "queries";
import { Mutation } from 'react-apollo';

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import * as Cookies from 'es-cookie';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "user",
      error: ""
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  onSignup(event, signupUser) {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      Cookies.set('token', data.signupUser.token);
      // await this.props.refetch();
      //this.clearState();
      this.props.history.push('/dashboard');
    }).catch(() => {
      this.setState({
        error: 'Either your email or username is already taken. Please adjust and try again.'
      })
    });
  }
  onUserNameChange(event) {
    event.preventDefault();
    this.setState({
      username: event.target.value
    });
  }
  onFirstNameChange(event) {
    event.preventDefault();
    this.setState({
      firstname: event.target.value
    });
  }
  onLastNameChange(event) {
    event.preventDefault();
    this.setState({
      lastname: event.target.value
    });
  }
  onEmailChange(event) {
    event.preventDefault();
    this.setState({
      email: event.target.value
    });
  }
  onPasswordChange(event) {
    event.preventDefault();
    this.setState({
      password: event.target.value
    });
  }
  onConfirmPasswordChange(event) {
    event.preventDefault();
    this.setState({
      confirm_password: event.target.value
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={SIGNUP_USER} variables={{ firstName: this.state.firstname, lastName: this.state.lastname, email: this.state.email, userName: this.state.username, password: this.state.password, role: this.state.role }}>
        {(signupUser, { loading, error, data }) => { 
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={5}>
                  <Card className={classes.cardSignup}>
                    <h2 className={classes.cardTitle}>Register</h2>
                    <CardBody>
                      <GridContainer justify="center">
                        {/* <GridItem xs={12} sm={12} md={5}>
                          <InfoArea
                            title="Marketing"
                            description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                            icon={Timeline}
                            iconColor="rose"
                          />
                          <InfoArea
                            title="Fully Coded in HTML5"
                            description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                            icon={Code}
                            iconColor="primary"
                          />
                          <InfoArea
                            title="Built Audience"
                            description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                            icon={Group}
                            iconColor="info"
                          />
                        </GridItem> */}
                        <GridItem xs={12} sm={12} md={12}>
                          {/* <div className={classes.center}>
                            <Button justIcon round color="twitter">
                              <i className="fab fa-twitter" />
                            </Button>
                            {` `}
                            <Button justIcon round color="dribbble">
                              <i className="fab fa-dribbble" />
                            </Button>
                            {` `}
                            <Button justIcon round color="facebook">
                              <i className="fab fa-facebook-f" />
                            </Button>
                            {` `}
                            <h4 className={classes.socialTitle}>or be classical</h4>
                          </div> */}
                          <form className={classes.form}>
                            <CustomInput
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses
                              }}
                              inputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                  >
                                    <Face className={classes.inputAdornmentIcon} />
                                  </InputAdornment>
                                ),
                                placeholder: "User Name...",
                                onChange: (event) => this.onUserNameChange(event)
                              }}
                            />
                            <CustomInput
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses
                              }}
                              inputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                  >
                                    {/* <Face className={classes.inputAdornmentIcon} /> */}
                                  </InputAdornment>
                                ),
                                placeholder: "First Name...",
                                onChange: (event) => this.onFirstNameChange(event)
                              }}
                            />
                            <CustomInput
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses
                              }}
                              inputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                  >
                                    {/* <Face className={classes.inputAdornmentIcon} /> */}
                                  </InputAdornment>
                                ),
                                placeholder: "Last Name...",
                                onChange: (event) => this.onLastNameChange(event)
                              }}
                            />
                            
                            <CustomInput
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses
                              }}
                              inputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                  >
                                    <Email className={classes.inputAdornmentIcon} />
                                  </InputAdornment>
                                ),
                                placeholder: "Email...",
                                onChange: (event) => this.onEmailChange(event)
                              }}
                            />
                            <CustomInput
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses
                              }}
                              inputProps={{
                                  type: "password",
                                  startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                  >
                                    <Icon className={classes.inputAdornmentIcon}>
                                      lock_outline
                                    </Icon>
                                  </InputAdornment>
                                ),
                                placeholder: "Password...",
                                onChange: (event) => this.onPasswordChange(event)
                              }}
                            />
                            <CustomInput
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses
                              }}
                              inputProps={{
                                  type: "password",
                                  startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                  >
                                    <Icon className={classes.inputAdornmentIcon}>
                                      lock_outline
                                    </Icon>
                                  </InputAdornment>
                                ),
                                placeholder: "Retype Password...",
                                onChange: (event) => this.onConfirmPasswordChange(event)
                              }}
                            />
                            <FormControlLabel
                              classes={{
                                root: classes.checkboxLabelControl,
                                label: classes.checkboxLabel
                              }}
                              control={
                                <Checkbox
                                  tabIndex={-1}
                                  onClick={() => this.handleToggle(1)}
                                  checkedIcon={
                                    <Check className={classes.checkedIcon} />
                                  }
                                  icon={<Check className={classes.uncheckedIcon} />}
                                  classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot
                                  }}
                                />
                              }
                              label={
                                <span>
                                  I agree to the{" "}
                                  <a href="#pablo">terms and conditions</a>.
                                </span>
                              }
                            />
                            <div className={classes.center}>
                              <Button round color="primary" onClick={event => this.onSignup(event, signupUser)}>
                                Get started
                              </Button>
                            </div>
                          </form>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
