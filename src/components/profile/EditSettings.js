// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { editUserSettings } from "../../redux/actions/userActions";
// MUI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import ResendVerification from "../misc/ResendVerification";

const styles = (theme) => ({
  ...theme.spread,
  button: {
    float: "right",
  },
});

class EditSettings extends Component {
  state = {
    boost: false,
    emails: {
      messages: false,
      notifications: false,
      matches: false,
    },
    premium: false,
    recycle: false,
    visible: false,
    errors: {},
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (nextProps.user.edited) {
      this.handleClose();
    }
  }

  mapUserSettingsToState = (settings) => {
    this.setState({
      boost: settings.boost ? settings.boost : false,
      emails: settings.emails
        ? settings.emails
        : { messages: false, notifications: false, matches: false },
      premium: settings.premium ? settings.premium : false,
      recycle: settings.recycle ? settings.recycle : false,
      visible: settings.visible ? settings.visible : false,
      errors: {},
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserSettingsToState(this.props.settings);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { settings } = this.props;
    this.mapUserSettingsToState(settings);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  handleEmailNotificationToggle = (event) => {
    let messages = this.state.emails.messages;
    let matches = this.state.emails.matches;
    this.setState({
      emails: {
        notifications: event.target.checked,
        messages,
        matches,
      },
    });
  };

  handleEmailMessageToggle = (event) => {
    let notifications = this.state.emails.notifications;
    let matches = this.state.emails.matches;
    this.setState({
      emails: {
        notifications,
        messages: event.target.checked,
        matches,
      },
    });
  };

  handleEmailMatchToggle = (event) => {
    let messages = this.state.emails.messages;
    let notifications = this.state.emails.notifications;
    this.setState({
      emails: {
        notifications,
        messages,
        matches: event.target.checked,
      },
    });
  };

  handleSubmit = () => {
    const userSettings = {
      visible: this.state.visible,
      emails: this.state.emails,
      premium: this.state.premium,
      boost: this.state.boost,
      recycle: this.state.recycle,
    };
    this.props.editUserSettings(userSettings);
  };

  render() {
    const { classes, toggleTheme } = this.props;
    const { errors } = this.state;

    return (
      <Fragment>
        <Tooltip placement="top" title="Settings">
          <IconButton
            onClick={this.handleOpen}
            className={classes.button}
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Change Settings</DialogTitle>
          <DialogContent>
            <form>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <FormControl
                    component="fieldset"
                    className={classes.textField}
                  >
                    <FormLabel component="legend">
                      Email Notification Settings
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.emails.notifications}
                            onChange={this.handleEmailNotificationToggle}
                            name="notifications"
                          />
                        }
                        label="General Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.emails.matches}
                            onChange={this.handleEmailMatchToggle}
                            name="matches"
                          />
                        }
                        label="New Matches"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.emails.messages}
                            onChange={this.handleEmailMessageToggle}
                            name="messages"
                          />
                        }
                        label="New Messages"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl
                    component="fieldset"
                    className={classes.textField}
                  >
                    <FormLabel component="legend">General Settings</FormLabel>
                    <FormGroup>
                      <Tooltip
                        title="Show your profile to other users"
                        aria-label="add"
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.visible}
                              onChange={this.handleChange}
                              name="visible"
                            />
                          }
                          label="Profile Visibility"
                        />
                      </Tooltip>
                      <FormHelperText error={errors.visible ? true : false}>
                        {errors.visible}
                      </FormHelperText>
                      <Tooltip title="Switch color themes" aria-label="add">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={localStorage.theme === "dark"}
                              onChange={toggleTheme}
                              name="toggle-theme"
                            />
                          }
                          label="Dark Mode"
                        />
                      </Tooltip>
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <ResendVerification />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditSettings.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  editUserSettings: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.user.settings,
  user: state.user,
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, { editUserSettings })(
  withStyles(styles)(EditSettings)
);
