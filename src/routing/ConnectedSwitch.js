import { connect } from "react-redux"
import { Switch } from "react-router-dom"
const ConnectedSwitch = connect(state => ({
  location: state.location,
}))(Switch)

export default ConnectedSwitch
