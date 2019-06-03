import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Avatar from "@material-ui/core/Avatar"
import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"
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
  },
  buttons: {
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
  buttonDelete: {
    margin: theme.spacing.unit - 2,
    height: "18px",
    color: "white",
    background: red[500],
  },
})

class CommentCard extends React.Component {
  state = {
    editing: false,
  }

  handleUpdate() {
    this.props.handleUpdate(this.props.cid, this.divComment.innerText)
  }

  handleDelete() {
    this.props.handleDelete(this.props.cid)
  }

  handleEdit() {
    this.setState({ editing: true })
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="user" className={classes.avatar}>
                U
              </Avatar>
            }
            title={this.props.name}
            subheader={this.props.date}
          />
          <CardContent>
            <div
              ref={divComment => {
                this.divComment = divComment
              }}
              className={classes.typography}
              contentEditable={this.props.editable}
            >
              {this.props.text}
            </div>
          </CardContent>
          {this.props.editable && (
            <div className={classes.buttons}>
              <Button
                className={classes.buttonDelete}
                onClick={() => this.handleDelete()}
              >
                {" "}
                delete{" "}
              </Button>
              <Button
                className={classes.buttonSubmit}
                onClick={() => this.handleUpdate()}
              >
                update
              </Button>
            </div>
          )}
        </Card>
      </div>
    )
  }
}

CommentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default withStyles(styles)(CommentCard)
