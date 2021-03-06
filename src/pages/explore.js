// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Redux
import { connect } from "react-redux";
import { getExplore } from "../redux/actions/dataActions";
// Material-UI
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// Components
import StaticProfile from "../components/profile/StaticProfile";
import ExploreAction from "../components/misc/ExploreAction";

const styles = (theme) => ({
  ...theme.spread,
  alert: {
    width: "100%",
    "& > * + *": {
      //marginTop: theme.spacing(2),
    },
  },
  actions: {
    position: "absolute",
    bottom: "10%",
  },
  matchAlert: {
    margin: "30px auto",
    padding: "10px",
    backgroundColor: "#f50057",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    textWeight: "bold",
  },
});

class explore extends Component {
  state = { errors: {} };

  componentDidMount() {
    if (!this.props.data.explore.uid) {
      this.props.getExplore();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      //this.setState({ body: "" });
    }
  }

  render() {
    const {
      classes,
      data: { match, explore },
      UI: { loading },
    } = this.props;
    const errors = this.state.errors;

    return (
      <>
        {errors.explore || errors.visibility ? (
          <>
            <Alert severity="warning" className={classes.alert}>
              {errors.explore}
            </Alert>
          </>
        ) : (
          <>
            <StaticProfile key={explore.uid} profile={explore} />
            {match && !loading && (
              <Paper className={classes.matchAlert}>
                <Typography variant="h6" display="block">
                  It's a match!
                </Typography>
              </Paper>
            )}
            <ExploreAction uid={explore.uid} className={classes.actions} />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

explore.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getExplore: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getExplore })(
  withStyles(styles)(explore)
);
