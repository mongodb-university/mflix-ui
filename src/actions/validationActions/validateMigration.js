import * as types from "../actionTypes"
import { beginTicketValidation, getMovie } from "./validationHelpers"

let movie_id = "573a1390f29313caabcd4132"
export function validateMigration() {
  return async dispatch => {
    try {
      dispatch(beginTicketValidation("Migration"))
      const response = await getMovie(movie_id)
      let dateTypes = ["<class 'datetime.datetime'>", "java.util.Date", "Date"]
      if (dateTypes.indexOf(response.updated_type) > -1) {
        return dispatch(validateMigrationSuccess())
      } else {
        return dispatch(
          validateMigrationError(
            new Error(
              "It does not appear that you correctly converted the type",
            ),
          ),
        )
      }
    } catch (e) {
      return dispatch(
        validateMigrationError(
          new Error("It does not appear that you correctly converted the type"),
        ),
      )
    }
  }
}

export function validateMigrationSuccess() {
  return { type: types.VALIDATE_MIGRATION_SUCCESS }
}

export function validateMigrationError(error) {
  return { type: types.VALIDATE_MIGRATION_ERROR, error }
}
