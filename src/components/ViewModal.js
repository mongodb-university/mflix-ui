import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import YouTube from "react-youtube"
import { connect } from "react-redux"
import { compose } from "redux"
import { bindActionCreators } from "redux"
import * as movieActions from "../actions/movieActions"

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const styles = theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
})

const randomVideo = () => {
  let roll = Math.random()
  if (roll < 0.5) {
    return "6gGXnE1Dbh0"
  } else {
    return "dQw4w9WgXcQ"
  }
}

class ViewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
    }
    this.handleReady = this.handleReady.bind(this)
  }

  handleReady(e) {
    const video = document.querySelector("video")
    if (video) {
      video.play()
      video.autoplay = true
    }
  }

  handleClose = () => {
    this.props.movieActions.viewMovie()
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
    }
    const { classes } = this.props

    return (
      <div allow="autoplay">
        <Modal
          aria-labelledby="video-viewer"
          aria-describedby="watch-video"
          open={this.props.displayModal}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <YouTube
              videoId={randomVideo()}
              opts={opts}
              onReady={this.handleReady}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

ViewModal.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({ movies: { viewMovie } }, { match }) {
  return {
    displayModal: viewMovie,
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
)(ViewModal)
