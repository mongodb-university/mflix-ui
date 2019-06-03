import * as types from "../actionTypes"
import request from "../request"
import { beginTicketValidation } from "./validationHelpers"

export function validateErrorHandling() {
  return async dispatch => {
    dispatch(beginTicketValidation("ErrorHandling"))
    try {
      let response = await checkMovieByIDError()
      if (response.error !== "Not found") {
        throw new Error()
      }
      return dispatch(validateErrorHandlingSuccess())
    } catch (e) {
      return dispatch(
        validateErrorHandlingError(
          new Error(
            "The return from the api was incorrect when providing a bad id to search by",
          ),
        ),
      )
    }
  }
}

export function validateErrorHandlingSuccess() {
  return { type: types.VALIDATE_ERROR_HANDLING_SUCCESS }
}

export function validateErrorHandlingError(error) {
  return { type: types.VALIDATE_ERROR_HANDLING_ERROR, error }
}

/**
 * Ticket 15 internal functions
 */

const checkMovieByIDError = () => {
  return request(`/api/v1/movies/id/foobar`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}
