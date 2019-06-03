import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as reportActions from "../actions/reportActions"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import Button from "@material-ui/core/Button"
import green from "@material-ui/core/colors/green"

const styles = theme => ({
  root: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "black",
    alignContent: "center",
    width: "100vw",
    minHeight: "100vh",
    height: "100%",
    flexBasis: 0,
  },
  button: {
    input: {
      display: "none",
    },
    color: "white",
    padding: "10px",
    background: green[500],
    display: "inline-flex",
    margin: theme.spacing.unit - 2,
  },
})

class AdminPanel extends Component {
  handleClick() {
    this.props.reportActions.fetchReport(this.props.user, this.props.history)
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Button className={classes.button} onClick={() => this.handleClick()}>
          User Report
        </Button>
      </div>
    )
  }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({ user }) {
  return {
    user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    reportActions: bindActionCreators(reportActions, dispatch),
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AdminPanel)
