import * as types from "../actionTypes"
import request from "../request"
import { assert, beginTicketValidation } from "./validationHelpers"

export function validateProjection() {
  return async dispatch => {
    try {
      dispatch(beginTicketValidation("Projection"))
      let response = await searchByCountry()
      let lengthAssertion = assert(710, response.titles.length)
      let keysAssertion = assert(
        710,
        response.titles.filter(elem => Object.keys(elem).length === 2).length,
      )
      if ([lengthAssertion, keysAssertion].every(elem => elem)) {
        return dispatch(validateProjectionSuccess())
      } else {
        return dispatch(
          validateProjectionError(
            new Error(
              "The return from the api was incorrect when searching by country",
            ),
          ),
        )
      }
    } catch (e) {
      return dispatch(
        validateProjectionError(
          new Error(
            "The return from the api was incorrect when searching by country",
          ),
        ),
      )
    }
  }
}

export function validateProjectionSuccess() {
  return { type: types.VALIDATE_PROJECTION_SUCCESS }
}

export function validateProjectionError(error) {
  return { type: types.VALIDATE_PROJECTION_ERROR, error }
}

/**
 *  2 internal functions
 */

const searchByCountry = () => {
  return request(`/api/v1/movies/countries?countries=Australia`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}
