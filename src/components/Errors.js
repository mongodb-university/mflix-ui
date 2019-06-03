import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as movieActions from "../actions/movieActions";
import { clearError } from "../actions/miscActions";
import { compose } from "redux";
import ErrorsDiv from "./ErrorsDiv";

class Errors extends Component {
  render() {
    const { errors } = this.props;

    let errMsgs = Object.keys(errors)
      .filter(key => errors[key] !== "")
      .map(key => {
        return (
          <div
            key={key}
            style={{
              backgroundColor: "black",
              color: "white",
              textAlign: "center"
            }}
          >
            <ErrorsDiv
              msg={errors[key]}
              dismiss={this.props.clearError}
              error={key}
            />
          </div>
        );
      });
    return <React.Fragment>{errMsgs}</React.Fragment>;
  }
}

function mapStateToProps({ errors }) {
  return {
    errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
    clearError: bindActionCreators(clearError, dispatch)
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Errors);
