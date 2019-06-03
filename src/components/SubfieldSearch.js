import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import purple from "@material-ui/core/colors/purple"
import Button from "@material-ui/core/Button"
import green from "@material-ui/core/colors/green"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as movieActions from "../actions/movieActions"
import * as miscActions from "../actions/miscActions"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
const mongo = green[500]

const styles = theme => ({
  container: {
    display: "inline-flex",
    alignItems: "center"
  },
  formControl: {
    flexDirection: "row"
  },
  inputLabelFocused: {
    color: purple[500]
  },
  inputInkbar: {
    "&:after": {
      backgroundColor: purple[500]
    }
  },
  textFieldRoot: {
    padding: 0
  },
  textFieldInput: {
    borderRadius: "4px 0 0 4px",
    backgroundColor: theme.palette.common.white,
    color: "black",
    fontSize: 16,
    padding: "10px 12px",
    width: "15rem",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    },
    height: "20px"
  },
  button: {
    input: {
      display: "none"
    },
    borderRadius: "0 4px 4px 0",
    color: "white",
    padding: "10px 0",
    background: mongo,
    width: "30px",
    display: "inline-flex"
  },
  group: {
    display: "inline-flex",
    flexDirection: "row"
  },
  label: {
    color: "white"
  },
  radio: {
    color: "white"
  }
})

class SubfieldSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: "",
      selected: false,
      defaultValue: "search by parameter",
      value: "text"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
    this.fireSearch = this.fireSearch.bind(this)
  }

  handleSelection(e, value) {
    this.setState({ value })
  }

  fireSearch(whichType) {
    return this.props.movieActions.searchMovies(
      whichType,
      this.state.searchText,
      this.props.history
    )
  }

  handleSearch(e) {
    this.props.miscActions.toggleDrawer()
    switch (this.state.value) {
      case "country":
        return this.props.movieActions.searchCountries(
          this.state.searchText,
          this.props.history
        )

      case "genre":
        return this.fireSearch("genre")

      case "cast":
        return this.fireSearch("cast")

      default:
        return this.fireSearch("text")
    }
  }

  handleChange(e) {
    this.setState({ searchText: e.target.value })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.container}>
          <FormControl className={classes.formControl}>
            <TextField
              id="searchText"
              placeholder={this.state.defaultValue}
              value={this.state.searchText}
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.textFieldRoot,
                  input: classes.textFieldInput
                }
              }}
              InputLabelProps={{
                shrink: true,
                className: classes.textFieldFormLabel
              }}
            />
            <Button className={classes.button} onClick={this.handleSearch}>
              search
            </Button>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <RadioGroup
              aria-label="searchType"
              name="searchType"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleSelection}
            >
              <FormControlLabel
                classes={{ label: classes.label }}
                value="text"
                control={<Radio style={{ color: "white" }} />}
                label="Text"
              />
              <FormControlLabel
                classes={{ label: classes.label }}
                value="country"
                control={<Radio style={{ color: "white" }} />}
                label="Country"
              />
              <FormControlLabel
                classes={{ label: classes.label }}
                value="genre"
                control={<Radio style={{ color: "white" }} />}
                label="Genre"
              />
              <FormControlLabel
                classes={{ label: classes.label }}
                value="cast"
                control={<Radio style={{ color: "white" }} />}
                label="Cast"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    )
  }
}

SubfieldSearch.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
    miscActions: bindActionCreators(miscActions, dispatch)
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    () => ({}),
    mapDispatchToProps
  )
)(SubfieldSearch)
