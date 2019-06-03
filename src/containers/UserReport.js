import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { bindActionCreators } from "redux"
import * as reportActions from "../actions/reportActions"

const styles = theme => ({
  root: {
    display: "flex",
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
  ul: {
    listStyle: "none",
    textAlign: "center",
  },
  li: {
    fontSize: "1.5em",
    color: "white",
  },
})

class UserReport extends Component {
  componentDidMount() {
    if (!this.props.report || this.props.report.length === 0) {
      this.props.reportActions.fetchReport(this.props.user, this.props.history)
    }
  }
  render() {
    const { report, classes } = this.props

    let userList = report.map((entry, idx) => (
      <li className={classes.li} key={entry._id}>
        {`# ${idx + 1} with ${entry.count} comments: ${entry._id}`}
      </li>
    ))
    return (
      <div className={classes.root}>
        <ul className={classes.ul}>{userList}</ul>
      </div>
    )
  }
}

UserReport.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({ report: { report }, user }) {
  return {
    report,
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
)(UserReport)
