import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

const PrivateRoute = ({
  component: Component,
  redirectRoute,
  user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        user.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectRoute} />
        )
      }
    />
  )
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(PrivateRoute)
