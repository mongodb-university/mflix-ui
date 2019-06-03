import * as types from "../actionTypes"
import { assert, beginTicketValidation, getMovie } from "./validationHelpers"

// Shrek 2
const movie_id = "573a13a7f29313caabd1aa1f"

export function validateGetComments() {
  return async dispatch => {
    try {
      dispatch(beginTicketValidation("GetComments"))
      let response = await getMovie(movie_id)
      let lengthAssertion = assert(response.movie.comments.length, 439)
      if (lengthAssertion) {
        return dispatch(validateGetCommentsSuccess())
      } else {
        return dispatch(
          validateGetCommentsError(
            new Error("The return from the api was incorrect"),
          ),
        )
      }
    } catch (e) {
      return dispatch(
        validateGetCommentsError(
          new Error("The return from the api was incorrect"),
        ),
      )
    }
  }
}

export function validateGetCommentsSuccess() {
  return { type: types.VALIDATE_GET_COMMENTS_SUCCESS }
}

export function validateGetCommentsError(error) {
  return { type: types.VALIDATE_GET_COMMENTS_ERROR, error }
}
