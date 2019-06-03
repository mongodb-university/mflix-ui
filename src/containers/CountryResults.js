import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as movieActions from "../actions/movieActions"
import { compose } from "redux"
import { withRouter } from "react-router-dom"

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
    fontSize: "2em",
    color: "green",
    cursor: "pointer",
  },
})

class CountryResults extends Component {
  handleClick = id => {
    this.props.movieActions.fetchMovieByID(id, this.props.history)
  }
  render() {
    const {
      classes,
      movies: { titles },
    } = this.props

    let titlesList = titles.map((title, idx) => (
      <li
        className={classes.li}
        key={idx}
        onClick={() => this.handleClick(title._id)}
      >
        {title.title}
      </li>
    ))
    return (
      <div className={classes.root}>
        <ul className={classes.ul}>{titlesList}</ul>
      </div>
    )
  }
}

CountryResults.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({ movies, errors }) {
  return {
    movies,
    errors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CountryResults)
