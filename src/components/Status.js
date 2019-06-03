import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as validationActions from "../actions/validationActions/index"
import { compose } from "redux"
import pixelLeaf from "../assets/pixelatedLeaf.svg"
import Snackbar from "@material-ui/core/Snackbar"
import TicketValidator from "./TicketValidator"

const styles = theme => ({
  root: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "black",
    width: "100vw",
    minHeight: "100vh",
    height: "100%",
    flexBasis: 0,
    textAlign: "center",
    paddingTop: "15px",
    alignItems: "center"
  },
  inner: {
    color: "red",
    fontSize: "64px",
    fontFamily: "'Press Start 2P', cursive",
    textAlign: "center",
    textStroke: "1px",
    textShadow:
      "3px 3px 0 green, -1px -1px 0 blue, 1px -1px 0 blue, -1px 1px 0 blue, 1px 1px 0 blue",
    paddingTop: "15px",
    animation: "blink 1s linear 3 forwards"
  },
  leaf: {
    marginTop: "15px",
    animation: "spinningLeaf 2s linear 0s infinite"
  }
})

class Status extends Component {
  interval = null
  timeout = null
  state = {
    startValidation: false,
    open: false
  }
  constructor(props) {
    super(props)
    this.onClickValidate = this.onClickValidate.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.leaf.style.opacity -= 0.01
    }, 30)
    this.timeout = setTimeout(() => {
      this.readyName.style.display = "none"
      this.leaf.style.display = "none"
      clearInterval(this.interval)
      this.setState({ startValidation: true })
    }, 3500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    clearTimeout(this.timeout)
  }

  onClickValidate(ticket) {
    this.props.validationActions[`validate${ticket}`]()
  }

  copied = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const playerOne = this.props.user.loggedIn
      ? `Ready ${this.props.user.info.name}`
      : "Player One"

    const Connection = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "Connection"
        ticketLabel="Connection"
        ticketValidating={this.props.validate.validatingConnection}
        ticketError={this.props.validate.ConnectionError}
        ticketSuccess={this.props.validate.ConnectionSuccess}
        ticketErrorMessage={this.props.validate.ConnectionErrorMessage}
        copied={this.copied}
      />
    )
    const Projection = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "Projection"
        ticketLabel="Projection"
        ticketValidating={this.props.validate.validatingProjection}
        ticketError={this.props.validate.ProjectionError}
        ticketSuccess={this.props.validate.ProjectionSuccess}
        ticketErrorMessage={this.props.validate.ProjectionErrorMessage}
        copied={this.copied}
      />
    )
    const TextAndSubfield = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "TextAndSubfield"
        ticketLabel="Text and Subfield Search"
        ticketValidating={this.props.validate.validatingTextAndSubfield}
        ticketError={this.props.validate.TextAndSubfieldError}
        ticketSuccess={this.props.validate.TextAndSubfieldSuccess}
        ticketErrorMessage={this.props.validate.TextAndSubfieldErrorMessage}
        copied={this.copied}
      />
    )
    const Paging = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "Paging"
        ticketLabel="Paging"
        ticketValidating={this.props.validate.validatingPaging}
        ticketError={this.props.validate.PagingError}
        ticketSuccess={this.props.validate.PagingSuccess}
        ticketErrorMessage={this.props.validate.PagingErrorMessage}
        copied={this.copied}
      />
    )
    const FacetedSearch = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "FacetedSearch"
        ticketLabel="Faceted Search"
        ticketValidating={this.props.validate.validatingFacetedSearch}
        ticketError={this.props.validate.FacetedSearchError}
        ticketSuccess={this.props.validate.FacetedSearchSuccess}
        ticketErrorMessage={this.props.validate.FacetedSearchErrorMessage}
        copied={this.copied}
      />
    )

    const UserManagement = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "UserManagement"
        ticketLabel="User Management"
        ticketValidating={this.props.validate.validatingUserManagement}
        ticketError={this.props.validate.UserManagementError}
        ticketSuccess={this.props.validate.UserManagementSuccess}
        ticketErrorMessage={this.props.validate.UserManagementErrorMessage}
        copied={this.copied}
      />
    )

    const UserPreferences = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "UserPreferences"
        ticketLabel="User Preferences"
        ticketValidating={this.props.validate.validatingUserPreferences}
        ticketError={this.props.validate.UserPreferencesError}
        ticketSuccess={this.props.validate.UserPreferencesSuccess}
        ticketErrorMessage={this.props.validate.UserPreferencesErrorMessage}
        copied={this.copied}
      />
    )

    const GetComments = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "GetComments"
        ticketLabel="Get Comments"
        ticketValidating={this.props.validate.validatingGetComments}
        ticketError={this.props.validate.GetCommentsError}
        ticketSuccess={this.props.validate.GetCommentsSuccess}
        ticketErrorMessage={this.props.validate.GetCommentsErrorMessage}
        copied={this.copied}
      />
    )

    const CreateUpdateComments = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "CreateUpdateComments"
        ticketLabel="Create/Update Comments"
        ticketValidating={this.props.validate.validatingCreateUpdateComments}
        ticketError={this.props.validate.CreateUpdateCommentsError}
        ticketSuccess={this.props.validate.CreateUpdateCommentsSuccess}
        ticketErrorMessage={
          this.props.validate.CreateUpdateCommentsErrorMessage
        }
        copied={this.copied}
      />
    )

    const DeleteComments = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "DeleteComments"
        ticketLabel="Delete Comments"
        ticketValidating={this.props.validate.validatingDeleteComments}
        ticketError={this.props.validate.DeleteCommentsError}
        ticketSuccess={this.props.validate.DeleteCommentsSuccess}
        ticketErrorMessage={this.props.validate.DeleteCommentsErrorMessage}
        copied={this.copied}
      />
    )

    const UserReport = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "UserReport"
        ticketLabel="User Report"
        ticketValidating={this.props.validate.validatingUserReport}
        ticketError={this.props.validate.UserReportError}
        ticketSuccess={this.props.validate.UserReportSuccess}
        ticketErrorMessage={this.props.validate.UserReportErrorMessage}
        copied={this.copied}
      />
    )

    const Migration = (
      <TicketValidator
              onClickValidate = {this.onClickValidate}
        ticketName = "Migration"
        ticketLabel="Migration"
        ticketValidating={this.props.validate.validatingMigration}
        ticketError={this.props.validate.MigrationError}
        ticketSuccess={this.props.validate.MigrationSuccess}
        ticketErrorMessage={this.props.validate.MigrationErrorMessage}
        copied={this.copied}
      />
    )

    const ConnectionPooling = (
      <TicketValidator
              onClickValidate = {this.onClickValidate}
        ticketName = "ConnectionPooling"
        ticketLabel="Connection Pooling"
        ticketValidating={this.props.validate.validatingConnectionPooling}
        ticketError={this.props.validate.ConnectionPoolingError}
        ticketSuccess={this.props.validate.ConnectionPoolingSuccess}
        ticketErrorMessage={this.props.validate.ConnectionPoolingErrorMessage}
        copied={this.copied}
      />
    )

    const Timeouts = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "Timeouts"
        ticketLabel="Timeouts"
        ticketValidating={this.props.validate.validatingTimeouts}
        ticketError={this.props.validate.TimeoutsError}
        ticketSuccess={this.props.validate.TimeoutsSuccess}
        ticketErrorMessage={this.props.validate.TimeoutsErrorMessage}
        copied={this.copied}
      />
    )

    const ErrorHandling = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "ErrorHandling"
        ticketLabel="Error Handling"
        ticketValidating={this.props.validate.validatingErrorHandling}
        ticketError={this.props.validate.ErrorHandlingError}
        ticketSuccess={this.props.validate.ErrorHandlingSuccess}
        ticketErrorMessage={this.props.validate.ErrorHandlingErrorMessage}
        copied={this.copied}
      />
    )

    const POLP = (
      <TicketValidator
        onClickValidate = {this.onClickValidate}
        ticketName = "POLP"
        ticketLabel="Principle of Least Privilege"
        ticketValidating={this.props.validate.validatingPOLP}
        ticketError={this.props.validate.POLPError}
        ticketSuccess={this.props.validate.POLPSuccess}
        ticketErrorMessage={this.props.validate.POLPErrorMessage}
        copied={this.copied}
      />
    )

    const week1Validations = this.state.startValidation ? (
      <div>
        <div>{Connection}</div>
        <div>{Projection}</div>
        <div>{TextAndSubfield}</div>
        <div>{Paging}</div>
        <div>{FacetedSearch}</div>
      </div>
    ) : (
      ""
    )
    const week2Validations = this.state.startValidation ? (
      <div>
        <div>{UserManagement}</div>
        <div>{UserPreferences}</div>
        <div>{GetComments}</div>
        <div>{CreateUpdateComments}</div>
        <div>{DeleteComments}</div>
        <div>{UserReport}</div>
        <div>{Migration}</div>
        <div>{ConnectionPooling}</div>
        <div>{Timeouts}</div>
        <div>{ErrorHandling}</div>
        <div>{POLP}</div>
      </div>
    ) : (
      ""
    )
    //<div>
    //<div>{week1Validations}</div>
    //{!this.props.validate.hasWeek1Errors &&
    //!this.props.validate.week1Validating && <div>{week2Validations}</div>}
    //</div>
    const validations = this.state.startValidation ? (
      <div>
        <div>{week1Validations}</div>
        <div>{week2Validations}</div>
      </div>
    ) : (
      ""
    )
    return (
      <div className={this.props.classes.root}>
        <div
          ref={readyName => {
            this.readyName = readyName
          }}
          className={this.props.classes.inner}
        >
          {playerOne}
        </div>
        <img
          ref={leaf => (this.leaf = leaf)}
          style={{ opacity: 1 }}
          className={this.props.classes.leaf}
          src={pixelLeaf}
          alt=""
        />
        {validations}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={1000}
          SnackbarContentProps={{
            "aria-describedby": "Copied"
          }}
          message={<span id="message-id">Copied!</span>}
        />
      </div>
    )
  }
}

Status.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps({ user, validate }) {
  return {
    user,
    validate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    validationActions: bindActionCreators(validationActions, dispatch)
  }
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Status)
