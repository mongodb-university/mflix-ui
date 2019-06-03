import * as types from "../actionTypes"
import request from "../request"
import { beginTicketValidation } from "./validationHelpers"

export function validatePOLP() {
  return async dispatch => {
    dispatch(beginTicketValidation("POLP"))
    let response = await getUserInfo()
    let roleAssertion = response.role === "readWrite"
    if (roleAssertion) {
      return dispatch(validatePOLPSuccess())
    } else {
      return dispatch(
        validatePOLPError(
          new Error(
            "It doesn't appear you have configured the application user",
          ),
        ),
      )
    }
  }
}

export function validatePOLPSuccess() {
  return { type: types.VALIDATE_POLP_SUCCESS }
}

export function validatePOLPError(error) {
  return { type: types.VALIDATE_POLP_ERROR, error }
}

/**
 * Ticket 13 internal functions
 */

const getUserInfo = () => {
  return request(`/api/v1/movies/config-options`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}
