import * as types from "../actionTypes"
import { requestWithStatus } from "../request"
import {
  beginTicketValidation,
  genRandomUser,
  register,
  login,
  deleteUser,
} from "./validationHelpers"

export function validateUserPreferences() {
  let testUser = genRandomUser()
  return async dispatch => {
    dispatch(beginTicketValidation("UserPreferences"))
    try {
      const registerResponse = await register(testUser)
      if (!registerResponse.ok) {
        throw new Error("invalid response to register")
      }
      const { auth_token } = registerResponse.json
      testUser.preferences = {
        favorite_fruit: "watermelon",
        favorite_number: "42",
      }

      let prefResponse = await updatePreferences(auth_token, testUser)
      if (!prefResponse.ok) {
        throw new Error("invalid response to update preferences")
      }

      const { email, password } = testUser

      let loginResponse = await login({ email, password })
      if (!loginResponse.ok){
        throw new Error("invalid response to update preferences - login of user failed")
      }
      // let's check if the paiload of the response was correctly sent back by the app
      if (
        loginResponse.json === undefined ||
        loginResponse.json.info === undefined ){
        throw new Error("invalid response for user preferences")
      }
      if (
        JSON.stringify(loginResponse.json.info.preferences) !==
        JSON.stringify(testUser.preferences)
      ) {
        throw new Error("preferences weren't saved correctly")
      }

      let deleteResponse = await deleteUser(auth_token, testUser)
      if (!deleteResponse.ok) {
        throw new Error("invalid response to delete")
      }
      return dispatch(validateUserPreferencesSuccess())
    } catch (error) {
      return dispatch(validateUserPreferencesError(error))
    }
  }
}

export function validateUserPreferencesSuccess() {
  return { type: types.VALIDATE_USER_PREFERENCES_SUCCESS }
}

export function validateUserPreferencesError(error) {
  return { type: types.VALIDATE_USER_PREFERENCES_ERROR, error }
}

const updatePreferences = (token, user) => {
  return requestWithStatus(`/api/v1/user/update-preferences`, {
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
