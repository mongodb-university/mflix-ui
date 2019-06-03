import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

const getScoreBackground = score => {
  let normalized = score
  if (score <= 10) {
    normalized = score * 10
  }
  if (normalized >= 80) {
    return {
      width: `${normalized}%`,
    }
  }
  if (normalized >= 60) {
    return {
      width: `${normalized}%`,
    }
  }
  if (normalized) {
    return {
      width: `${normalized}%`,
    }
  }
}

const styles = theme => ({
  progressBar: {
    marginTop: "15px",
    height: "20px",
    width: "100%",
    background: "#555",
    borderRadius: "25px",
    boxShadow: "inset 0 -1px 1px rgba(255, 255, 255, 0.3)",
    "& > span": {
      display: "block",
      height: "100%",
      borderTopLeftRadius: "20px",
      borderBottomLeftRadius: "20px",
      backgroundImage:
        "linear-gradient(center bottom, rgb(43,194,83) 37%, rgb(84,240,84) 69%)",
      boxShadow:
        "inset 0 2px 9px  rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.4)",
      overflow: "hidden",
    },
  },
})

const RatingBar = props => {
  const { classes, ratings } = props
  const bars = Object.keys(ratings).map((elem, ix) => {
    let info = getScoreBackground(ratings[elem][elem])
    let displayName = elem.charAt(0).toUpperCase() + elem.slice(1)
    let stats = ratings[elem].total && ratings[elem].total
    return (
      <div key={ix}>
        <h4 style={{ color: "white", textAlign: "justify" }}>
          {displayName} Rating: {ratings[elem][elem].toLocaleString()}{" "}
          {stats && `(from ${new Intl.NumberFormat().format(stats)} reviews)`}
        </h4>
        <div key={ix} className={classes.progressBar}>
          <span
            style={{
              backgroundColor: ratings[elem].backgroundColor,
              width: info.width,
            }}
          />
          <p
            style={{
              width: "100%",
              height: "100%",
              margin: "0 auto",
              top: "-100%",
              position: "relative",
              color: "white",
            }}
          />
        </div>
      </div>
    )
  })

  return <div>{bars}</div>
}

RatingBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RatingBar)
