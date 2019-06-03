import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/userActions";
import { compose } from "redux";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Email from "@material-ui/icons/Email";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

import green from "@material-ui/core/colors/green";

const mongo = green[500];

const styles = theme => ({
  root: {
    justifyContent: "center",
    backgroundColor: "black",
    alignContent: "center",
    width: "100vw",
    height: "100vh",
    display: "flex"
  },
  form: {
    display: "inline-flex",
    flexDirection: "column",
    color: "white",
    margin: "3%",
    padding: "25px",
    background: "#363636",
    marginTop: "5%",
    borderRadius: "8px",
    width: "320px",
    height: "450px"
  },
  input: {
    color: "white",
    background: "#e0e0e0"
  },
  newUser: {
    margin: theme.spacing.unit,
    color: "white"
  },
  inputStyle: {
    fontSize: "18px",
    color: "white",
    borderRadius: "4px"
  },
  buttonOk: {
    margin: theme.spacing.unit,
    height: "18px",
    color: "white",
    background: mongo,
    alignSelf: "flex-end"
  },
  buttonNope: {
    margin: theme.spacing.unit,
    height: "18px",
    color: "white",
    background: "red",
    alignSelf: "flex-end"
  },
  buttonRow: {
    margin: theme.spacing.unit,
    marginTop: "auto",
    display: "inline-flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end"
  }
});

class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      emailReadOnly: true,
      passwordReadOnly: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.userActions.login(
      {
        password: this.state.password,
        email: this.state.email
      },
      this.props.history
    );
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleFocusEmail = () => {
    this.setState({ emailReadOnly: false });
  };

  handleFocusPassword = () => {
    this.setState({ passwordReadOnly: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form className={classes.form}>
          <div className={classes.newUser}>
            <h3>Existing User?</h3>
            <p>
              Sign in below. Don't have an account?{" "}
              <Link
                to="signup"
                style={{ textDecoration: "none", color: "gray" }}
              >
                Click here
              </Link>
            </p>
          </div>
          <input type="text" style={{ display: "none" }} />
          <input type="password" style={{ display: "none" }} />
          <FormControl className={classes.newUser}>
            <InputLabel style={{ color: "white" }} htmlFor="email">
              Email
            </InputLabel>
            <Input
              style={{ color: "white" }}
              id="adornment-login-email"
              type="email"
              readOnly={this.state.emailReadOnly}
              onFocus={this.handleFocusEmail}
              value={this.state.email}
              autoComplete="email"
              onChange={this.handleChange("email")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton className={classes.newUser}>
                    <Email />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl style={{ color: "white" }} className={classes.newUser}>
            <InputLabel style={{ color: "white" }} htmlFor="password">
              Password
            </InputLabel>
            <Input
              style={{ color: "white" }}
              id="adornment-login-password"
              autoComplete="off"
              readOnly={this.state.passwordReadOnly}
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onFocus={this.handleFocusPassword}
              onChange={this.handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    className={classes.newUser}
                    onClick={this.handleClickShowPasssword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.buttonRow}>
            <Button className={classes.buttonNope}>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Cancel
              </Link>
            </Button>
            <Button className={classes.buttonOk} onClick={this.handleSubmit}>
              Log In
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ user }) {
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginCard);
