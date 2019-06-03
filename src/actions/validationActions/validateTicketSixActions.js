import * as types from "../actionTypes"
import request from "../request"
import { beginTicketValidation } from "./validationHelpers"

const statusOk = status => status === "success"

export function validateTicketSix() {
  let testUser = genRandomUser()
  return async dispatch => {
    dispatch(beginTicketValidation("Six"))
    try {
      const registerResponse = await register(testUser)
      if (!Object.keys(registerResponse.info).length > 0) {
        throw new Error("invalid response to register")
      }
      const duplicateRegisterResponse = await register(testUser)
      if (!statusOk(duplicateRegisterResponse.status)) {
        console.log(
          `\nHey there! The error response code was expected.
It's us testing if duplicate emails can register.
Great Job!`,
        )
      }
      if (statusOk(duplicateRegisterResponse.status)) {
        throw new Error("duplicate emails should not be allowed")
      }
      let { auth_token } = registerResponse
      let logoutResponse = await logout(auth_token)
      if (!statusOk(logoutResponse.status)) {
        throw new Error("invalid response to logout")
      }
      const { email, password } = testUser
      const loginResponse = await login({ email, password })
      if (!statusOk(loginResponse.status)) {
        throw new Error("invalid response to login")
      }
      auth_token = loginResponse.auth_token
      let deleteResponse = await deleteUser(auth_token, testUser)
      if (!statusOk(deleteResponse.status)) {
        throw new Error("invalid response to delete")
      }
      return dispatch(validateTicketSixSuccess())
    } catch (error) {
      return dispatch(validateTicketSixError(error))
    }
  }
}

export function validateTicketSixSuccess() {
  return { type: types.VALIDATE_TICKET_SIX_SUCCESS }
}

export function validateTicketSixError(error) {
  return { type: types.VALIDATE_TICKET_SIX_ERROR, error }
}

/**
 * Ticket 5 internal functions
 */

const register = user => {
  return request(`/api/v1/user/register`, {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(user => user)
    .catch(error => error)
}

const login = user => {
  return request(`/api/v1/user/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(user => user)
    .catch(error => error)
}

const logout = user => {
  return request(`/api/v1/user/logout`, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${user}`,
      "content-type": "application/json",
    },
  })
    .then(res => res)
    .catch(error => error)
}

const deleteUser = (token, user) => {
  return request(`/api/v1/user/delete`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ password: user.password }),
  })
    .then(res => res)
    .catch(error => error)
}

const genRandomUser = () => ({
  name: Math.random()
    .toString(36)
    .substr(2, 9),
  email: `${Math.random()
    .toString(36)
    .substr(2, 9)}@${Math.random()
    .toString(36)
    .substr(2, 5)}.${Math.random()
    .toString(36)
    .substr(2, 3)}`,
  password: `${Math.random()
    .toString(36)
    .substr(2, 9)}`,
})
