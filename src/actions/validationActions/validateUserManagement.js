import * as types from "../actionTypes"
import {
  beginTicketValidation,
  genRandomUser,
  register,
  logout,
  login,
  deleteUser
} from "./validationHelpers"

export function validateUserManagement() {
  let testUser = genRandomUser()
  return async dispatch => {
    dispatch(beginTicketValidation("UserManagement"))
    try {
      const registerResponse = await register(testUser)
      if (!registerResponse.ok) {
        throw new Error("invalid response to register")
      }
      const duplicateRegisterResponse = await register(testUser)
      if (!duplicateRegisterResponse.ok) {
        console.log(
          `\nHey there! The error response code was expected.
It's us testing if duplicate emails can register.
Great Job!`
        )
      }
      if (duplicateRegisterResponse.ok) {
        throw new Error("duplicate emails should not be allowed")
      }
      let { auth_token } = registerResponse.json
      let logoutResponse = await logout(auth_token)
      if (!logoutResponse.ok) {
        throw new Error("invalid response to logout")
      }
      const { email, password } = testUser
      const loginResponse = await login({ email, password })
      if (!loginResponse.ok) {
        throw new Error("invalid response to login")
      }
      auth_token = loginResponse.json.auth_token
      let deleteResponse = await deleteUser(auth_token, testUser)
      if (!deleteResponse.ok) {
        throw new Error("invalid response to delete")
      }
      return dispatch(validateUserManagementSuccess())
    } catch (error) {
      return dispatch(validateUserManagementError(error))
    }
  }
}

export function validateUserManagementSuccess() {
  return { type: types.VALIDATE_USER_MANAGEMENT_SUCCESS }
}

export function validateUserManagementError(error) {
  return { type: types.VALIDATE_USER_MANAGEMENT_ERROR, error }
}
