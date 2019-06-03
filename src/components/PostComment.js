import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as movieActions from "../actions/movieActions"
import { compose } from "redux"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import green from "@material-ui/core/colors/green"
import Button from "@material-ui/core/Button"

const styles = theme => ({
  card: {
    width: "65vw",
    borderRadius: "5px",
    margin: "1%",
  },
  avatar: {
    backgroundColor: green[500],
  },
  typography: {
    textAlign: "justify",
    width: "100%",
    height: "100%",
    margin: "2% auto",
    border: "1px solid blue",
  },
  buttonDiv: {
    display: "inline-flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  buttonSubmit: {
    margin: theme.spacing.unit - 2,
    height: "18px",
    color: "white",
    background: green[500],
  },
})

class PostComment extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.movieActions.submitComment(
      this.props.movieID,
      this.divComment.innerText,
      this.props.auth_token
    )
    this.divComment.innerText = ""
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader title="Submit a comment" />
          <CardContent>
            <div
              contentEditable={true}
              className={classes.typography}
              ref={divComment => {
                this.divComment = divComment
              }}
            />
          </CardContent>
          <div className={classes.buttonDiv}>
            <Button
              className={classes.buttonSubmit}
              onClick={this.handleSubmit}
            >
              submit
            </Button>
          </div>
        </Card>
      </div>
    )
  }
}

PostComment.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({ user }) {
  return {
    auth_token: user.auth_token,
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
)(PostComment)
