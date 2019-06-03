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
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
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
    color: "white"
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

class SignupCard extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    showPassword: false
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.userActions.register(
      {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      },
      this.props.history
    );
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.newUser}>
            <h3>New User?</h3>
            <p>Make an account by filling out the form below.</p>
          </div>

          <FormControl className={classes.newUser}>
            <InputLabel style={{ color: "white" }} htmlFor="name">
              Name
            </InputLabel>
            <Input
              id="adornment-name"
              autoCapitalize="name"
              style={{ color: "white" }}
              value={this.state.name}
              onChange={this.handleChange("name")}
              autoComplete="name"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton className={classes.newUser}>
                    <AccountCircle />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.newUser}>
            <InputLabel style={{ color: "white" }} htmlFor="password">
              Email
            </InputLabel>
            <Input
              id="adornment-email"
              style={{ color: "white" }}
              type="email"
              value={this.state.email}
              onChange={this.handleChange("email")}
              autoComplete="email"
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
              id="adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={this.handleChange("password")}
              autoComplete="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    className={classes.newUser}
                    onClick={this.handleClickShowPasssword}
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
            <Button type="submit" className={classes.buttonOk}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

SignupCard.propTypes = {
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
)(SignupCard);
