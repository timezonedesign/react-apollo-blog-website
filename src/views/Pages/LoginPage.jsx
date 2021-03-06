import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { SIGNIN_USER } from "queries";
import { Mutation } from 'react-apollo';

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import * as Cookies from 'es-cookie';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      userName: "",
      password: ""
    };
    this.onSignin = this.onSignin.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUserNameChange(event) {
    event.preventDefault();
    this.setState({
      userName: event.target.value
    });
  }
  onPasswordChange(event) {
    event.preventDefault();
    this.setState({
      password: event.target.value
    });
  }
  onSignin(event, signinUser) {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      Cookies.set('token', data.signinUser.token);
      //await this.props.refetch();
      //this.clearState();
      this.props.history.push('/dashboard');

    }).catch(error => {
      this.setState({
        error: error.graphQLErrors.map(x => x.message)
      })
      // console.error("ERR =>", error.graphQLErrors.map(x => x.message));
    });
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={SIGNIN_USER} variables={{ userName: this.state.userName, password: this.state.password }}>
        {(signinUser, { loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4}>
                  <form>
                    <Card login className={classes[this.state.cardAnimaton]}>
                      <CardHeader
                        className={`${classes.cardHeader} ${classes.textCenter}`}
                        color="rose"
                      >
                        <h4 className={classes.cardTitle}>Log in</h4>
                        <div className={classes.socialLine}>
                          {[
                            "fab fa-facebook-square",
                            "fab fa-twitter",
                            "fab fa-google-plus"
                          ].map((prop, key) => {
                            return (
                              <Button
                                color="transparent"
                                justIcon
                                key={key}
                                className={classes.customButtonClass}
                              >
                                <i className={prop} />
                              </Button>
                            );
                          })}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <CustomInput
                          labelText="User Name"
                          id="username"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            onChange: (event) => this.onUserNameChange(event)
                          }}
                        />
                        {/* <CustomInput
                          labelText="Email..."
                          id="email"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            )
                          }}
                        /> */}
                        <CustomInput
                          labelText="Password"
                          id="password"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                              type: "password",
                              endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputAdornmentIcon}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) => this.onPasswordChange(event)
                          }}
                        />
                      </CardBody>
                      <CardFooter className={classes.justifyContentCenter}>
                        <Button color="rose" simple size="lg" onClick={event => this.onSignin(event, signinUser)} block>
                          Let's Go
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </GridItem>
              </GridContainer>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
