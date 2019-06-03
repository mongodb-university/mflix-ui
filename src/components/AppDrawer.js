import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import SubfieldSearch from "./SubfieldSearch"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as miscActions from "../actions/miscActions"
import { compose } from "redux"

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    background: "#262626",
    height: "100vh",
  },
  divider: {
    marginTop: "15px",
  },
})

class AppDrawer extends React.Component {
  render() {
    const { classes } = this.props

    const sideList = (
      <div className={classes.root}>
        <Divider className={classes.divider} />
        <SubfieldSearch />
        <Divider className={classes.divider} />
      </div>
    )

    return (
      <Drawer
        open={this.props.misc.open}
        onClose={this.props.miscActions.toggleDrawer}
      >
        <div tabIndex={0} role="button">
          {sideList}
        </div>
      </Drawer>
    )
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({ misc, movies: { facets, facetFilters } }) {
  return {
    misc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    miscActions: bindActionCreators(miscActions, dispatch),
  }
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AppDrawer)
