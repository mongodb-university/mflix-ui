import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as movieActions from "../actions/movieActions"
import { compose } from "redux"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import green from "@material-ui/core/colors/green"

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  facets: {
    alignItems: "center",
    background: "black",
    color: "white",
  },
  checked: {
    color: green[500],
  },
  label: {
    color: green[500],
  },
}

class Facets extends Component {
  constructor(props) {
    super(props)
    this.ratingFacet = this.ratingFacet.bind(this)
    this.runtimeFacet = this.runtimeFacet.bind(this)
    this.handleRatingFacetSelection = this.handleRatingFacetSelection.bind(this)
    this.handleRuntimeFacetSelection = this.handleRuntimeFacetSelection.bind(
      this
    )
  }
  formGroup(facet, elem, label, fn) {
    return (
      <FormGroup row key={elem._id}>
        <FormControlLabel
          classes={{ label: this.props.classes.label }}
          control={
            <Checkbox
              classes={{ default: this.props.classes.label }}
              checked={this.props.facetFilters[facet][elem._id]}
              onChange={fn(elem._id)}
              value={elem._id + ""}
            />
          }
          label={label}
        />
      </FormGroup>
    )
  }
  runtimeFacet() {
    const { classes } = this.props
    const { runtime } = this.props.facets
    return (
      <div className={classes.root}>
        <h4 style={{ color: "white", marginRight: "20px" }}>Runtime:</h4>
        {runtime.map(elem => {
          switch (elem._id + "") {
            case "0":
              return this.formGroup(
                "runtime",
                elem,
                `0-59 (${elem.count})`,
                this.handleRuntimeFacetSelection
              )
            case "60":
              return this.formGroup(
                "runtime",
                elem,
                `60-89 (${elem.count})`,
                this.handleRuntimeFacetSelection
              )
            case "90":
              return this.formGroup(
                "runtime",
                elem,
                `90-119 (${elem.count})`,
                this.handleRuntimeFacetSelection
              )
            case "120":
              return this.formGroup(
                "runtime",
                elem,
                `120-180 (${elem.count})`,
                this.handleRuntimeFacetSelection
              )
            case "180":
              return this.formGroup(
                "runtime",
                elem,
                `180+ (${elem.count})`,
                this.handleRuntimeFacetSelection
              )
            default:
              return this.formGroup(
                "runtime",
                elem,
                `other (${elem.count})`,
                this.handleRuntimeFacetSelection
              )
          }
        })}
      </div>
    )
  }
  ratingFacet() {
    const { classes } = this.props
    const { rating } = this.props.facets
    return (
      <div className={classes.root}>
        <h4 style={{ color: "white", marginRight: "20px" }}>Rating:</h4>
        {rating.map(elem => {
          switch (elem._id + "") {
            case "0":
              return this.formGroup(
                "rating",
                elem,
                `0-49 (${elem.count})`,
                this.handleRatingFacetSelection
              )
            case "50":
              return this.formGroup(
                "rating",
                elem,
                `50-69 (${elem.count})`,
                this.handleRatingFacetSelection
              )
            case "70":
              return this.formGroup(
                "rating",
                elem,
                `70-89 (${elem.count})`,
                this.handleRatingFacetSelection
              )
            case "90":
              return this.formGroup(
                "rating",
                elem,
                `90+ (${elem.count})`,
                this.handleRatingFacetSelection
              )
            default:
              return this.formGroup(
                "rating",
                elem,
                `other (${elem.count})`,
                this.handleRatingFacetSelection
              )
          }
        })}
      </div>
    )
  }
  handleRatingFacetSelection = name => event => {
    let filter
    switch (name + "") {
      case "0":
        filter = movie =>
          movie.metacritic && (movie.metacritic >= 0 && movie.metacritic < 50)
        break
      case "50":
        filter = movie =>
          movie.metacritic && (movie.metacritic >= 50 && movie.metacritic < 70)
        break

      case "70":
        filter = movie =>
          movie.metacritic && (movie.metacritic >= 70 && movie.metacritic < 90)
        break
      case "90":
        filter = movie => movie.metacritic && movie.metacritic >= 90
        break

      default:
        filter = movie =>
          !movie.metacritic || typeof movie.metacritic === "string"
    }
    this.props.movieActions.applyFacetFilter("rating", name, filter)
  }

  handleRuntimeFacetSelection = name => event => {
    let filter
    switch (name + "") {
      case "0":
        filter = movie =>
          movie.runtime && (movie.runtime >= 0 && movie.runtime < 60)
        break
      case "60":
        filter = movie =>
          movie.runtime && (movie.runtime >= 60 && movie.runtime < 90)
        break

      case "90":
        filter = movie =>
          movie.runtime && (movie.runtime >= 90 && movie.runtime < 120)
        break
      case "120":
        filter = movie =>
          movie.runtime && (movie.runtime >= 120 && movie.runtime < 180)
        break

      case "180":
        filter = movie => movie.runtime && movie.runtime >= 180
        break

      default:
        filter = movie =>
          !movie.runtime || (!movie.runtime < 0 && movie.runtime <= Infinity)
    }
    this.props.movieActions.applyFacetFilter("runtime", name, filter)
  }

  render() {
    const { classes } = this.props
    const ratingFacet = this.ratingFacet()
    const runtimeFacet = this.runtimeFacet()
    return (
      <div>
        <div className={classes.facets}>
          {Object.keys(this.props.facets.rating).length > 0 && ratingFacet}
        </div>
        <div className={classes.facets}>
          {Object.keys(this.props.facets.runtime).length > 0 && runtimeFacet}
        </div>
      </div>
    )
  }
}

Facets.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({ misc, movies: { facets, facetFilters } }) {
  return {
    facets,
    facetFilters,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
  }
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Facets)
