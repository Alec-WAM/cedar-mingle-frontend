// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Material-UI
import { Typography, Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
});

function Copyright() {
  return (
    <>
      {"Copyright © "}
      <Link color="inherit" to="/">
        Cedar Mingle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </>
  );
}

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.footer}>
        <Grid container className={classes.footerContainer}>
          <Grid item sm style={{ textAlign: "left" }}>
            <Typography variant="body2">
              <span className={classes.footerItem}>
                <Copyright />
              </span>
            </Typography>
          </Grid>
          <Grid item sm style={{ textAlign: "right" }}>
            <Typography variant="body2">
              <span className={classes.footerItem}>
                <Link to="/privacy">Privacy</Link>
              </span>
              <span className={classes.footerItem}>
                <Link to="/disclaimer">Disclaimer</Link>
              </span>
              <span className={classes.footerItem}>
                <Link to="/terms">Terms of Service</Link>
              </span>
              <span className={classes.footerItem}>
                <Link to="/contact">Contact</Link>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
