import {
  LOGIN_SUCCESS,
  LOGOUT,
  SAVE_PREFS_SUCCESS,
  CHECK_ADMIN_SUCCESS,
  CHECK_ADMIN_FAIL,
} from "../actions/actionTypes"
import { loadState } from "../store/localStorage"

let initialState = {
  auth_token: "",
  info: {
    preferences: {
      favorite_cast: "",
      preferred_language: "",
    },
  },
  loggedIn: false,
  isAdmin: false,
}
let localState
try {
  localState = { ...initialState, ...loadState() }
} catch (e) {
  localState = initialState
}

export default function user(state = localState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      let loaded_prefs
      if (!action.user.info.preferences) {
        loaded_prefs = initialState.info.preferences
      } else {
        loaded_prefs = action.user.info.preferences
      }
      return {
        auth_token: action.user.auth_token,
        info: {
          ...state.info,
          ...action.user.info,
          preferences: { ...state.info.preferences, ...loaded_prefs },
        },
        loggedIn: true,
      }
    case LOGOUT: {
      return initialState
    }

    case SAVE_PREFS_SUCCESS:
      return {
        ...state,
        info: {
          ...state.info,
          preferences: { ...state.info.preferences, ...action.preferences },
        },
      }

    case CHECK_ADMIN_FAIL:
      return {
        ...state,
        isAdmin: false,
      }

    case CHECK_ADMIN_SUCCESS:
      return {
        ...state,
        isAdmin: true,
      }

    default:
      return state
  }
}
