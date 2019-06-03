import * as types from "../actionTypes"
import {
  searchByQueryAndPage,
  assert,
  beginTicketValidation
} from "./validationHelpers"

export function validatePaging() {
  return async dispatch => {
    dispatch(beginTicketValidation("Paging"))
    try {
      let castPaging0 = await searchByCast()
      let castPaging1 = await searchByCastNextPage()
      let genrePaging0 = await searchByGenre()
      let genrePaging5 = await searchByGenrePage5()
      let textPaging0 = await searchByText()
      let textPaging7 = await searchByTextPage7()
      if (
        [
          castPaging0,
          castPaging1,
          genrePaging0,
          genrePaging5,
          textPaging0,
          textPaging7
        ].every(elem => elem)
      ) {
        return dispatch(validatePagingSuccess())
      }
    } catch (e) {
      return dispatch(validatePagingError(e))
    }
  }
}

export function validatePagingSuccess() {
  return { type: types.VALIDATE_PAGING_SUCCESS }
}

export function validatePagingError(error) {
  return { type: types.VALIDATE_PAGING_ERROR, error }
}

/**
 * Ticket 6 internal functions
 */

const searchByCast = async () => {
  try {
    let response = await searchByQueryAndPage("cast", "Morgan Freeman", 0)
    let lengthAssertion = assert(20, response.movies.length)
    let movie = response.movies.pop()
    let imdb = movie.imdb.id === 428803
    let writers = movie.writers.length === 4
    let title = movie.title === "March of the Penguins"
    if (lengthAssertion && imdb && writers && title) {
      return true
    } else {
      throw new Error("Did not receive the proper response when paging by cast")
    }
  } catch (e) {
    throw new Error("Did not receive the proper response when paging by cast")
  }
}

const searchByCastNextPage = async () => {
  try {
    let response = await searchByQueryAndPage("cast", "Morgan Freeman", 1)
    let lengthAssertion = assert(20, response.movies.length)
    let movie = response.movies.pop()
    let imdb = movie.imdb.id === 304328
    let writers = movie.writers.length === 1
    let title = movie.title === "Levity"
    if (lengthAssertion && imdb && writers && title) {
      return true
    } else {
      throw new Error("Did not receive the proper response when paging by cast")
    }
  } catch (e) {
    throw new Error("Did not receive the proper response when paging by cast")
  }
}

const searchByGenre = async () => {
  try {
    let response = await searchByQueryAndPage("genre", "Action", 0)
    let lengthAssertion = assert(20, response.movies.length)
    let movie = response.movies.pop()
    let imdb = movie.imdb.id === 416449
    let writers = movie.writers.length === 5
    let title = movie.title.toString() === "300"
    if (lengthAssertion && imdb && writers && title) {
      return true
    } else {
      throw new Error(
        "Did not receive the proper response when paging by genre"
      )
    }
  } catch (e) {
    throw new Error("Did not receive the proper response when paging by genre")
  }
}

const searchByGenrePage5 = async () => {
  try {
    let response = await searchByQueryAndPage("genre", "Action", 5)
    let lengthAssertion = assert(20, response.movies.length)
    let movie = response.movies.pop()
    let imdb = movie.imdb.id === 1385867
    let writers = movie.writers.length === 2
    let title = movie.title.toString() === "Cop Out"
    if (lengthAssertion && imdb && writers && title) {
      return true
    } else {
      throw new Error(
        "Did not receive the proper response when paging by genre"
      )
    }
  } catch (e) {
    throw new Error("Did not receive the proper response when paging by genre")
  }
}

const searchByText = async () => {
  try {
    let response = await searchByQueryAndPage("text", "Heist", 0)
    let lengthAssertion = assert(20, response.movies.length)
    let movie = response.movies.pop()
    let imdb = movie.imdb.id === 1748197
    let writers = movie.writers.length === 2
    let title = movie.title.toString() === "Setup"
    if (lengthAssertion && imdb && writers && title) {
      return true
    } else {
      throw new Error("Did not receive the proper response when paging by text")
    }
  } catch (e) {
    throw new Error("Did not receive the proper response when paging by text")
  }
}

const searchByTextPage7 = async () => {
  try {
    let response = await searchByQueryAndPage("text", "Heist", 7)
    let lengthAssertion = assert(20, response.movies.length)
    let movie = response.movies.pop()
    let imdb = movie.imdb.id === 119892
    let writers = movie.writers.length === 1
    let title = movie.title.toString() === "Phoenix"
    if (lengthAssertion && imdb && writers && title) {
      return true
    } else {
      throw new Error("Did not receive the proper response when paging by text")
    }
  } catch (e) {
    throw new Error("Did not receive the proper response when paging by text")
  }
}
