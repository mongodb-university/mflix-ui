import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import grey from "@material-ui/core/colors/grey"
import { connect } from "react-redux"
import { compose } from "redux"
import { bindActionCreators } from "redux"
import * as userActions from "../actions/userActions"
import { withRouter } from "react-router-dom"

const mongoGrey = grey[900]

const styles = theme => ({
  buttonStyle: {
    margin: theme.spacing.unit - 2,
    height: "18px",
    color: "white",
    background: mongoGrey,
  },
  root: {
    alignItems: "center",
  },
})

class AccountPanel extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.userActions.logout(
      this.props.user.auth_token,
      this.props.history
    )
  }

  clickAdmin() {
    this.props.userActions.checkAdminStatus(this.props.user)
  }

  render() {
    const { classes, user } = this.props
    const LoginLogout = !user.loggedIn ? (
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button className={classes.buttonStyle}>log in</Button>
      </Link>
    ) : (
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button className={classes.buttonStyle} onClick={this.logout}>
          logout
        </Button>
      </Link>
    )

    const RegisterName = !user.loggedIn ? (
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <Button className={classes.buttonStyle}>sign up</Button>
      </Link>
    ) : (
      <Link to="/account" style={{ textDecoration: "none" }}>
        <Button className={classes.buttonStyle}>{user.info.name}</Button>
      </Link>
    )
    const AdminButton = user.loggedIn &&
      user.info.isAdmin && (
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <Button
            className={classes.buttonStyle}
            onClick={() => this.clickAdmin()}
          >
            admin
          </Button>
        </Link>
      )
    return (
      <div className={classes.root}>
        {AdminButton}
        <Link to="/status" style={{ textDecoration: "none" }}>
          <Button className={classes.buttonStyle}>status</Button>
        </Link>
        {LoginLogout}
        {RegisterName}
      </div>
    )
  }
}

AccountPanel.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountPanel)
