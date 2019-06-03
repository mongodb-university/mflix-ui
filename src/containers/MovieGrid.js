import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import throttle from "lodash.throttle"
import GridList from "@material-ui/core/GridList"
import MovieTile from "../components/MovieTile"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as movieActions from "../actions/movieActions"
import { compose } from "redux"
import CircularProgress from "@material-ui/core/CircularProgress"
import Facets from "../components/Facets"

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
  gridList: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "black",
    width: "100vw",
    flexBasis: 0,
    flexGrow: 0,
  },
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

class MovieGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paging: false,
      movies: [],
    }
    this.onScroll = throttle(this.onScroll.bind(this), 1000)
  }
  componentDidMount() {
    if (!this.props.movies || this.props.movies.movies.length === 0) {
      this.props.movieActions.fetchMovies()
    }
    window.addEventListener("scroll", this.onScroll, true)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, true)
    this.onScroll.cancel()
  }

  componentWillReceiveProps(props) {
    if (props.movies.movies.length === props.movies.total_results) {
      this.setState({ paging: false })
      this.onScroll.cancel()
      window.removeEventListener("scroll", this.onScroll, true)
    }
    if (!props.movies.paging) {
      this.setState({ paging: false })
      this.onScroll.cancel()
    }
  }

  onScroll() {
    const scroll = document.getElementById("root")
    if (
      !this.props.movies.paging &&
      document.body.offsetHeight + window.pageYOffset >=
        scroll.scrollHeight - 1500 &&
      this.props.movies.movies.length !== this.props.movies.total_results
    ) {
      this.props.movieActions.beginPaging()
      this.props.movieActions.paginate(
        this.props.movies.movies,
        this.props.movies.page,
        this.props.movies.filters
      )
    }
  }

  render() {
    const { classes } = this.props
    const movies = this.props.movies.shownMovies
    if (
      !movies ||
      (movies.length === 0 &&
        (!this.props.errors.FetchMovieFailure ||
          !this.props.searchMovieFailure))
    ) {
      return (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )
    } else {
      return (
        <div
          className={this.props.classes.root}
          onScroll={this.onScroll}
          id="scroll"
        >
          <Facets />
          <GridList
            cellHeight={600}
            className={this.props.classes.gridList}
            cols={4}
          >
            {movies.map(movie => <MovieTile key={movie._id} movie={movie} />)}
          </GridList>
        </div>
      )
    }
  }
}

MovieGrid.propTypes = {
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
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MovieGrid)
