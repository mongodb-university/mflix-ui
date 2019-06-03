import * as types from "../actionTypes"
import request from "../request"
import { assert, beginTicketValidation } from "./validationHelpers"

export function validateTimeouts() {
  return async dispatch => {
    dispatch(beginTicketValidation("Timeouts"))
    let response = await getPoolSize()
    let timeAssertion = assert(2500, response.wtimeout)
    if (timeAssertion) {
      return dispatch(validateTimeoutsSuccess())
    } else {
      return dispatch(
        validateTimeoutsError(
          new Error("The return from the api was incorrect"),
        ),
      )
    }
  }
}

export function validateTimeoutsSuccess() {
  return { type: types.VALIDATE_TIMEOUTS_SUCCESS }
}

export function validateTimeoutsError(error) {
  return { type: types.VALIDATE_TIMEOUTS_ERROR, error }
}

/**
 * Ticket 13 internal functions
 */

const getPoolSize = () => {
  return request(`/api/v1/movies/config-options`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}
