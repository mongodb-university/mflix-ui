import * as types from "./actionTypes"
import request from "./request"

export function login(json, history) {
  return dispatch => {
    return request(`/api/v1/user/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then(user => dispatch(loginSuccess(user)))
      .then(history.push("/"))
      .catch(error => dispatch(loginFail({ error })))
  }
}

export function register(json, history) {
  return dispatch => {
    return request(`/api/v1/user/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then(user => {
        dispatch(loginSuccess(user))
      })
      .then(history.push("/"))
      .catch(error => {
        return dispatch(loginFail({ error }))
      })
  }
}

export function logout(token) {
  return dispatch => {
    return request(`/api/v1/user/logout`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
      .then(dispatch(loggedOut()))
      .catch(dispatch(loggedOut()))
  }
}

export function updatePrefs(preferences, user) {
  return dispatch => {
    let updatedPreferences = { ...user.info.preferences, ...preferences }
    return request(`/api/v1/user/update-preferences`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${user.auth_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ preferences: updatedPreferences }),
    })
      .then(dispatch(savePrefs(preferences)))
      .catch(e => dispatch(failSavePrefs()))
  }
}

export function checkAdminStatus(user) {
  console.log("check admin status beginning function")
  return dispatch => {
    dispatch(beginAdminCheck())
    return request(`/api/v1/user/admin`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${user.auth_token}`,
        "content-type": "application/json",
      },
    })
      .then(json => checkAdminReturn(json))
      .then(() => dispatch(adminSuccess()))
      .catch(() => dispatch(adminFail()))
  }
}

function checkAdminReturn(json) {
  if (!json.status === "success") {
    throw new Error("not authorized")
  }
  return json
}

export function beginAdminCheck() {
  return { type: types.CHECK_ADMIN }
}

export function adminSuccess() {
  console.log("admin check ok")
  return { type: types.CHECK_ADMIN_SUCCESS }
}

export function adminFail() {
  console.log("admin check fail")
  return { type: types.CHECK_ADMIN_FAIL }
}

export function savePrefs(preferences) {
  return { type: types.SAVE_PREFS_SUCCESS, preferences }
}

export function failSavePrefs() {
  return {
    type: types.SAVE_PREFS_FAIL,
    error: "Failed to save user preference",
  }
}

export function loggedOut() {
  return { type: types.LOGOUT }
}

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user }
}

export function loginFail(error) {
  return { type: types.LOGIN_FAIL, error }
}
