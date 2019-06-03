import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

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
})

const TicketWaiting = props => {
  return (
    <div className={props.classes.validationBar}>
      <span className={props.classes.ticketLabel}>{props.ticketLabel}</span>
      <div className={props.classes.validationTicket}>Currently Validating</div>
    </div>
  )
}

TicketWaiting.propTypes = {
  classes: PropTypes.object.isRequired,
  ticketLabel: PropTypes.string.isRequired,
}

export default withStyles(styles)(TicketWaiting)
