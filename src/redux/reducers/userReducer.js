import {
  MARK_MESSAGES_READ,
  MARK_NOTIFICATIONS_READ,
  SET_AUTHENTICATED,
  SET_FORGOT_PASSWORD_SENT,
  SET_USER,
  SET_SETTINGS,
  SET_SETTINGS_EDITED,
  SET_SETTINGS_ERROR,
  SET_NOTIFICATIONS,
  SET_UNAUTHENTICATED,
  SET_VERIFICATION_RESENT,
} from "../types";

const initialState = {
  authenticated: false,
  profile: {},
  settings: {},
  edited: false,
  notifications: [],
  resent: false,
  sent: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SETTINGS_EDITED:
      return {
        ...state,
        edited: true,
      };
    case SET_SETTINGS_ERROR:
      return {
        ...state,
        edited: false,
      };
    case SET_VERIFICATION_RESENT:
      return {
        ...state,
        resent: true,
      };
    case SET_FORGOT_PASSWORD_SENT:
      return {
        ...state,
        sent: true,
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    case MARK_MESSAGES_READ:
      state.messages.forEach((msg) => (msg.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
