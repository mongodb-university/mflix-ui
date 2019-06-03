import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as movieActions from "../actions/movieActions"
import { compose } from "redux"
import RatingBar from "./RatingBar"
import Viewer from "./ViewModal"
import Button from "@material-ui/core/Button"
import CommentCard from "./CommentCard"
import PostComment from "./PostComment"
import { withRouter } from "react-router-dom"
const mongo = green[500]

const getRunTime = runtime =>
  `${Math.floor(runtime / 60)} hr ${runtime % 60} min`

const packageRatings = movie =>
  Object.keys(movie).reduce((acc, key) => {
    switch (key) {
      case "imdb":
        if (movie[key].rating) {
          return {
            ...acc,
            imdb: {
              [key]: movie[key].rating,
              backgroundColor: "#3273dc",
              total: movie[key].votes,
            },
          }
        } else {
          return acc
        }
      case "metacritic":
        return {
          ...acc,
          metacritic: {
            [key]: movie[key],
            backgroundColor: mongo,
          },
        }
      case "tomatoes":

        if (movie[key] && movie[key].viewer && movie[key].viewer.meter) {
          return {
            ...acc,
            tomatoes: {
              [key]: movie[key].viewer.meter,
              backgroundColor: "red",
              total: movie[key].viewer.numReviews,
            },
          }
        } else {
          return acc
        }
      default:
        return acc
    }
  }, {})

const styles = {
  root: {
    display: "flex",
    background: "black",
    justifyContent: "space-around",
    width: "100vw",
    textAlign: "center",
    flexDirection: "row",
    flexFlow: "wrap",
  },
  half: {
    marginTop: "65px",
    minWidth: "450px",
    maxWidth: "45%",
    flexDirection: "column",
    alignItems: "center",
    flex: "0 0 auto",
    height: "100vh",
  },
  img: {
    width: "300px",
    height: "444px",
  },
  watchButton: {
    margin: "8px",
    color: "white",
    alignItems: "center",
  },
  button: {
    height: "18px",
    color: "white",
    background: mongo,
  },
  title: {
    color: "white",
    fontWeight: 320,
    lineHeight: 1.125,
    fontSize: "2em",
    margin: "15px",
  },
  runtime: {
    color: "black",
    fontSize: "12px",
    background: "#d5d5d5",
    padding: "5px",
    margin: "15px",
    borderRadius: "4px",
  },
  director: {
    color: "white",
    marginTop: "20px",
    margin: "15px",
  },
  directorText: {
    color: mongo,
    marginLeft: "5px",
    background: "#474747",
    padding: "5px",
    borderRadius: "5px",
  },
  plotContainer: {
    display: "inline-flex",
    justifyContent: "center",
    background: "#363636",
    width: "100%",
    padding: "10px 0",
    borderRadius: "7px",
    marginTop: "15px",
    textAlign: "center",
  },
  plot: {
    margin: "15px",
    color: "white",
    fontSize: "1rem",
    lineHeight: "1.5em",
    width: "80%",
    height: "80%",
    textAlign: "justify",
  },
  year: {
    borderRadius: "290486px",
    background: "#363636",
    padding: ".25em .75em",
    marginRight: "4px",
    color: "#E0E0E0",
    fontSize: ".9rem",
  },
  rating: {
    borderRadius: "290486px",
    background: "#ffdd57",
    padding: ".25em .75em",
    marginLeft: "4px",
    color: "black",
    fontSize: ".9rem",
  },
  cast: {
    color: "#E0E0E0",
    padding: "0 15px",
    fontWeight: 300,
    lineHeight: 1.2,
    fontSize: "18px",
  },
  skittlesHeader: {
    color: "white",
    marginBottom: "10px",
  },
  skittlesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    color: "white",
  },
  genresSkittles: {
    color: "white",
    fontSize: "12px",
    background: "#363636",
    padding: "5px",
    margin: "0 5px",
    borderRadius: "4px",
    float: "left",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  castSkittles: {
    color: "white",
    fontSize: "12px",
    background: mongo,
    padding: "5px",
    margin: "0 5px",
    borderRadius: "4px",
    float: "left",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  writerSkittles: {
    color: "white",
    fontSize: "12px",
    background: "#363636",
    padding: "5px",
    margin: "0 5px",
    borderRadius: "4px",
    float: "left",
  },
}

class MovieDetail extends Component {
  constructor(props) {
    super(props)
    this.handleViewClick = this.handleViewClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.imgError = this.imgError.bind(this)
    this.state = {
      matrix: false,
    }
  }

  rain = null
  makeRainTimeout = null

  makeRain() {
    // Easter Egg Matrix rain when a user clicks on one of the matrix movies
    // getting the 2d context of the canvas element, set through the ref fn
    const c = this.canvas
    const ctx = c.getContext("2d")
    // chinese characters to use for the rain itself
    const chinese = Array.from(
      "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑"
    )

    let font_size = 10
    // columns is the width of the canvas divided by font size
    let columns = this.canvas.width / font_size
    // drops array, one "drop" per column
    let drops = new Array(columns).fill(1)

    function draw() {
      // setting the background to black
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      // filling the canvas with the black background
      ctx.fillRect(0, 0, c.width, c.height)
      // green color for the drops
      ctx.fillStyle = "#0F0"
      // setting the font
      ctx.font = font_size + "px arial"
      // iterate through the drops array
      drops.forEach((elem, i) => {
        // select a random chinese character for the rain
        let text = chinese[Math.floor(Math.random() * chinese.length)]
        // set the position of the letter (text, x, y)
        // so each iteration, draw the letter in the specific column at an ever
        // increasing y position, making it move down the canvas
        ctx.fillText(text, i * font_size, elem * font_size)
        // begin randomizing the rain after the initial waterfall effect
        if (elem * font_size > c.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        // increase y position by 1 for next animation loop to move the letter
        drops[i]++
      })
    }
    // run the animation loop every 33 milliseconds
    this.rain = setInterval(draw, 33)
  }

  matrixCheck() {
    const matrices = [
      "573a13a2f29313caabd0b8f3",
      "573a139bf29313caabcf3d23",
      "573a13a3f29313caabd0d923",
      "573a13a7f29313caabd1a006",
    ]
    if (this.props.movie._id && matrices.includes(this.props.movie._id)) {
      this.makeRainTimeout = setTimeout(() => {
        this.makeRain()
      }, 1500)
    }
  }

  componentDidMount() {
    this.props.movieActions.fetchMovieByID(this.props.id, this.props.history)
    window.scrollTo(0, 0)
    const ctx = this.canvas.getContext("2d")
    const img = this.poster

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 300, 444)
      this.matrixCheck()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.rain)
    clearTimeout(this.makeRainTimeout)
  }

  imgError(id) {
    this.matrixCheck()
    let ctx = this.canvas.getContext("2d")
    ctx.font = "20pt Calibri"
    ctx.textAlign = "center"
    ctx.fillStyle = "white"
    ctx.fillText("Image failed to load", 150, 222)
  }

  handleUpdate(id, text) {
    this.props.movieActions.editComment(
      id,
      text,
      this.props.user.auth_token,
      this.props.movie._id
    )
  }

  handleDelete(id) {
    this.props.movieActions.deleteComment(
      id,
      this.props.user.auth_token,
      this.props.movie._id
    )
  }

  handleSearch(subfield, e) {
    this.props.movieActions.searchMovies(
      subfield,
      e.target.innerHTML,
      this.props.history
    )
  }

  handleViewClick() {
    this.props.movieActions.viewMovie()
  }

  matrixInterval = null

  render() {
    const { classes, movie } = this.props

    const comments = movie.comments && (
      <div>
        <h2 style={{ color: mongo }}>Comments</h2>
        <PostComment movieID={this.props.movie._id} />
        {movie.comments.map(c => {
          return (
            <CommentCard
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete}
              cid={c._id}
              key={c._id}
              editable={c.email === this.props.user.info.email}
              name={c.name}
              date={c.date}
              text={c.text}
            />
          )
        })}
      </div>
    )

    const runtime = movie.runtime && (
      <span style={{ color: "white" }}>
        Runtime:{" "}
        <span className={classes.runtime}>{getRunTime(movie.runtime)}</span>
      </span>
    )

    const directors = movie.directors && (
      <div className={classes.director}>
        <span style={{ color: "white" }}>
          Directed by{" "}
          {movie.directors.map((elem, ix) => (
            <span key={ix} className={classes.directorText}>
              {elem}
            </span>
          ))}
        </span>
      </div>
    )

    const plot =
      movie.fullplot || movie.plot ? (
        <div className={classes.plotContainer}>
          <div className={classes.plot}>{movie.fullplot || movie.plot}</div>
        </div>
      ) : (
        ""
      )

    const genres = movie.genres ? (
      <div>
        <h4 className={classes.skittlesHeader}>Genres</h4>
        <div className={classes.skittlesContainer}>
          {movie.genres.map((elem, ix) => (
            <span
              key={ix}
              className={classes.genresSkittles}
              onClick={e => this.handleSearch("genre", e)}
            >
              {elem}
            </span>
          ))}
        </div>
      </div>
    ) : (
      ""
    )

    const cast = movie.cast ? (
      <div>
        <h4 className={classes.skittlesHeader}>Cast</h4>
        <div className={classes.skittlesContainer}>
          {movie.cast.map((elem, ix) => (
            <span
              key={ix}
              className={classes.castSkittles}
              onClick={e => this.handleSearch("cast", e)}
            >
              {elem}
            </span>
          ))}
        </div>
      </div>
    ) : (
      ""
    )

    const writers = movie.writers ? (
      <div>
        <h4 className={classes.skittlesHeader}>Writers</h4>
        <div className={classes.skittlesContainer}>
          {movie.writers.map((elem, ix) => (
            <span key={ix} className={classes.writerSkittles}>
              {elem}
            </span>
          ))}
        </div>
      </div>
    ) : (
      ""
    )
    return (
      <div>
        <div className={classes.root}>
          <Viewer />
          <div className={classes.half}>
            <p className={classes.title}>{movie.title}</p>
            <div className={classes.infoContainer}>
              <span className={classes.year}>{movie.year}</span>
              {movie.rated && (
                <span className={classes.rating}>{movie.rated}</span>
              )}
            </div>
            {directors}
            {runtime}
            {plot}
            <RatingBar ratings={packageRatings(movie)} />
          </div>
          <div className={classes.half}>
            <canvas
              width={300}
              height={444}
              ref={canvas => {
                this.canvas = canvas
              }}
            >
              <img
                ref={poster => {
                  this.poster = poster
                }}
                src={movie.poster || ""}
                alt={movie.title}
                onError={() => this.imgError()}
              />
            </canvas>
            <div className={classes.watchButton}>
              <Button className={classes.button} onClick={this.handleViewClick}>
                watch movie
              </Button>
            </div>
            {genres}
            {cast}
            {writers}
          </div>
          {comments}
        </div>
      </div>
    )
  }
}

MovieDetail.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({ movies: { movie, viewMovie }, user }, { match }) {
  return {
    movie,
    id: match.params.id,
    displayModal: viewMovie,
    user,
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
)(MovieDetail)
