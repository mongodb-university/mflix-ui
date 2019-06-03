import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "../actions/userActions"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import green from "@material-ui/core/colors/green"
import Input from "@material-ui/core/Input"
import InputLabel  from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"

const styles = theme => ({
  root: {
    display: "flex",
    background: "black",
    height: "100%",
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
  accountDelete: {},
  preferenceSelection: {
    display: "inline-flex",
    justifyContent: "center",
    width: "35vw",
    background: "#242424",
    padding: "10px",
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  formLabel: {
    color: "white",
  },
  checked: {
    color: green[500],
    "& + $bar": {
      backgroundColor: green[500],
    },
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    background: "#242424",
  },
  bar: {},
  buttonSave: {
    margin: theme.spacing.unit - 2,
    height: "18px",
    color: "white",
    background: green[500],
  },
})

class Account extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.savePrefs = this.savePrefs.bind(this)
    this.state = {
      ...props.user.info.preferences,
    }
  }

  preferenceMapping = {
    preferred_language: "Preferred Language",
    favorite_cast: "Favorite Cast",
  }

  textPreferences = ["preferred_language", "favorite_cast"]

  handleSelect = name => event => {
    this.props.userActions.updatePrefs(
      { [name]: event.target.checked },
      this.props.user
    )
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  savePrefs() {
    this.props.userActions.updatePrefs(this.state, this.props.user)
  }

  loadSelectPrefs() {}

  loadTextPrefs() {
    const { classes, user } = this.props
    const prefs = Object.keys(user.info.preferences).filter(key =>
      this.textPreferences.includes(key)
    )
    return prefs.map(key => {
      return (
        <div className={classes.inputContainer} key={key}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor={key} style={{ color: "white" }}>
              {this.preferenceMapping[key]}
            </InputLabel>
            <Input
              id={key}
              value={this.state[key]}
              onChange={this.handleChange}
              style={{ color: "white" }}
            />
          </FormControl>
        </div>
      )
    })
  }

  render() {
    const { classes, user } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.half}>
          <h2 style={{ color: "white" }}>Hello {user.info.name}</h2>
          {this.loadTextPrefs()}
          <Button className={classes.buttonSave} onClick={this.savePrefs}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              save
            </Link>
          </Button>
        </div>
      </div>
    )
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ user }) => ({ user })

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Account)
