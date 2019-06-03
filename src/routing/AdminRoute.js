import React from "react"
import { Route, Redirect } from "react-router-dom"
import CircularProgress from "@material-ui/core/CircularProgress"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"

const styles = theme => ({
  loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
})

const AdminRoute = ({
  component: Component,
  redirectRoute,
  user,
  misc,
  classes,
  ...rest
}) => {
  if (misc.checkingAdminStatus) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <Route
      {...rest}
      render={props =>
        user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectRoute} />
        )
      }
    />
  )
}

const mapStateToProps = ({ user, misc }) => ({ user, misc })

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(AdminRoute)
