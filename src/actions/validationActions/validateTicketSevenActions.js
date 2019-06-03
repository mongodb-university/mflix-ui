import * as types from "../actionTypes"
import request from "../request"
import { beginTicketValidation } from "./validationHelpers"

const statusOk = status => status === "success"

export function validateTicketSeven() {
  let testUser = genRandomUser()
  return async dispatch => {
    dispatch(beginTicketValidation("Seven"))
    try {
      const registerResponse = await register(testUser)
      if (!statusOk(registerResponse.status)) {
        throw new Error("invalid response to register")
      }
      const { auth_token } = registerResponse
      testUser.preferences = {
        favorite_fruit: "watermelon",
        favorite_number: "42",
      }

      let prefResponse = await updatePreferences(auth_token, testUser)
      if (!statusOk(prefResponse.status)) {
        throw new Error("invalid response to update preferences")
      }

      const { email, password } = testUser

      let loginResponse = await login({ email, password })
      if (
        JSON.stringify(loginResponse.info.preferences) !==
        JSON.stringify(testUser.preferences)
      ) {
        throw new Error("preferences weren't saved correctly")
      }

      let deleteResponse = await deleteUser(auth_token, testUser)
      if (!statusOk(deleteResponse.status)) {
        throw new Error("invalid response to delete")
      }
      return dispatch(validateTicketSevenSuccess())
    } catch (error) {
      return dispatch(validateTicketSevenError(error))
    }
  }
}

export function validateTicketSevenSuccess() {
  return { type: types.VALIDATE_TICKET_SEVEN_SUCCESS }
}

export function validateTicketSevenError(error) {
  return { type: types.VALIDATE_TICKET_SEVEN_ERROR, error }
}

const updatePreferences = (token, user) => {
  return request(`/api/v1/user/update-preferences`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ preferences: user.preferences }),
  })
    .then(user => user)
    .catch(error => error)
}

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

const deleteUser = (token, user) => {
  return request(`/api/v1/user/delete`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
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
