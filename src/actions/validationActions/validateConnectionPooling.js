import * as types from "../actionTypes"
import request from "../request"
import { assert, beginTicketValidation } from "./validationHelpers"

export function validateConnectionPooling() {
  return async dispatch => {
    dispatch(beginTicketValidation("ConnectionPooling"))
    let response = await getPoolSize()
    let poolAssertion = assert(50, response.pool_size)
    if ([poolAssertion].every(elem => elem)) {
      return dispatch(validateConnectionPoolingSuccess())
    } else {
      return dispatch(
        validateConnectionPoolingError(
          new Error("The return from the api was incorrect"),
        ),
      )
    }
  }
}

export function validateConnectionPoolingSuccess() {
  return { type: types.VALIDATE_CONNECTION_POOLING_SUCCESS }
}

export function validateConnectionPoolingError(error) {
  return { type: types.VALIDATE_CONNECTION_POOLING_ERROR, error }
}

/**
 * Ticket internal functions
 */

const getPoolSize = () => {
  return request(`/api/v1/movies/config-options`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}
