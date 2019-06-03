import * as types from "../actionTypes"
import request from "../request"
import { assert, beginTicketValidation } from "./validationHelpers"

export function validateConnection() {
  return async dispatch => {
    dispatch(beginTicketValidation("Connection"))
    let response = await getMovies()
    let filtersAssertion = assert(0, Object.keys(response.filters).length)
    let moviesAssertion = assert(20, response.movies.length)
    let resultsAssertion = assert(45993, response.total_results)
    let pageAssertion = assert(0, response.page)
    if (
      [
        filtersAssertion,
        moviesAssertion,
        resultsAssertion,
        pageAssertion,
      ].every(elem => elem)
    ) {
      return dispatch(validateConnectionSuccess())
    } else {
      return dispatch(
        validateConnectionError(
          new Error("The return from the api was incorrect"),
        ),
      )
    }
  }
}

export function validateConnectionSuccess() {
  return { type: types.VALIDATE_CONNECTION_SUCCESS }
}

export function validateConnectionError(error) {
  return { type: types.VALIDATE_CONNECTION_ERROR, error }
}

/**
 * Ticket internal functions
 */

const getMovies = () => {
  return request(`/api/v1/movies/`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}
