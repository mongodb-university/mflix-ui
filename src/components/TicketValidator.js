import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { CopyToClipboard } from "react-copy-to-clipboard"
import red from "@material-ui/core/colors/red"
import grey from "@material-ui/core/colors/grey"

const mongoRed = red[900]
const mongoGrey = grey[400]

const styles = theme => ({
  validationBar: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50vw",
    marginTop: "15px",
    height: "40px",
  },
  validationTicket: {
    display: "flex",
    padding: "0 15px",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    width: "30vw",
  },
  validationTicketWaiting: {
    display: "flex",
    padding: "0 15px",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    width: "30vw",
    background: mongoGrey,
  },
  ticketLabel: {
    display: "flex",
    padding: "0 5px",
    background: "#e6e6e6",
    textAlign: "center",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    width: "10vw",
  },
  copyButton: {
    height: "40px",
    color: "white",
    background: "#6b6b6b",
    justifyContent: "center",
    borderRadius: 0,
    "&:hover": {
      background: "#6b6b6b",
    },
    width: "10vw",
  },
})

class TicketValidator extends React.Component {
  state = {
    beginValidating: false,
  }

  onClickValidate() {
    this.setState({beginValidating: true})
    this.props.onClickValidate(this.props.ticketName)
  }

  render() {
    const props = this.props
    if (!this.state.beginValidating) {
      return (
        <div className={props.classes.validationBar} onClick={() => this.onClickValidate()}>
          <span className={props.classes.ticketLabel}>{props.ticketLabel}</span>
          <div className={props.classes.validationTicketWaiting}>
            Click to begin validation
          </div>
        </div>
      )
    } else {
      switch (props.ticketValidating) {
        case true:
          return (
            <div className={props.classes.validationBar}>
              <span className={props.classes.ticketLabel}>
                {props.ticketLabel}
              </span>
              <div className={props.classes.validationTicketWaiting}>
                Currently Validating
              </div>
            </div>
          )

        default:
          return !props.ticketError ? (
            <div className={props.classes.validationBar}>
              <span className={props.classes.ticketLabel}>
                {props.ticketLabel}
              </span>
              <div
                className={props.classes.validationTicket}
                style={{ background: "#056705" }}
              >
                {props.ticketSuccess}
              </div>
              <CopyToClipboard text={props.ticketSuccess}>
                <Button
                  onClick={props.copied}
                  className={props.classes.copyButton}
                >
                  Copy
                </Button>
              </CopyToClipboard>
            </div>
          ) : (
            <div
              className={props.classes.validationBar}
              style={{ background: mongoRed }}
            >
              {props.ticketLabel}: {props.ticketErrorMessage}
            </div>
          )
      }
    }
  }
}

TicketValidator.propTypes = {
  classes: PropTypes.object.isRequired,
  copied: PropTypes.func.isRequired,
  onClickValidate: PropTypes.func.isRequired,
  ticketError: PropTypes.bool.isRequired,
  ticketErrorMessage: PropTypes.string.isRequired,
  ticketSuccess: PropTypes.string.isRequired,
  ticketLabel: PropTypes.string.isRequired,
  ticketValidating: PropTypes.bool.isRequired,
  ticketName: PropTypes.string.isRequired,
}

export default withStyles(styles)(TicketValidator)
