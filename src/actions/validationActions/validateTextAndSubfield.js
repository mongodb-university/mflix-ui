import * as types from "../actionTypes"
import request from "../request"
import { assert, beginTicketValidation } from "./validationHelpers"

export function validateTextAndSubfield() {
  return async dispatch => {
    dispatch(beginTicketValidation("TextAndSubfield"))
    try {
      let castSearch = await searchGG()
      let textSearch = await searchSS()
      let genreSearch = await searchReality()
      if ([castSearch, textSearch, genreSearch].every(elem => elem)) {
        return dispatch(validateTextAndSubfieldSuccess())
      }
    } catch (e) {
      return dispatch(validateTextAndSubfieldError(e))
    }
  }
}

export function validateTextAndSubfieldSuccess() {
  return { type: types.VALIDATE_TEXT_AND_SUBFIELD_SUCCESS }
}

export function validateTextAndSubfieldError(error) {
  return { type: types.VALIDATE_TEXT_AND_SUBFIELD_ERROR, error }
}

/**
 * Ticket 3 internal functions
 */

const searchByCast = () => {
  const griffinGluck = encodeURIComponent("Griffin Gluck")
  return request(`/api/v1/movies/search?cast=${griffinGluck}`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}

const searchByText = () => {
  const shawshank = encodeURI("shawshank")
  return request(`/api/v1/movies/search?text=${shawshank}`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}

const searchByGenre = () => {
  const reality = encodeURI("Reality-TV")
  return request(`/api/v1/movies/search?genre=${reality}`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}

const searchGG = async () => {
  try {
    let response = await searchByCast()
    let lengthAssertion = assert(1, response.movies.length)
    let movie = response.movies.pop()
    let imdb = movie.imdb.id === 4981636
    let writers = movie.writers.length === 3
    let title = movie.title === "Middle School: The Worst Years of My Life"
    if (lengthAssertion && imdb && writers && title) {
      return true
    } else {
      throw new Error(
        "Did not receive the proper response when searching by cast",
      )
    }
  } catch (e) {
    throw new Error(
      "Did not receive the proper response when searching by cast",
    )
  }
}

const searchSS = async () => {
  try {
    let response = await searchByText()
    let lengthAssertion = assert(3, response.movies.length)
    let movie = response.movies.pop()
    let imdb = movie.imdb.id === 1045642
    let writers = movie.writers.length === 3
    let title = movie.title === "Tales from the Script"
    if (lengthAssertion && imdb && writers && title) {
      return true
    } else {
      throw new Error(
        "Did not receive the proper response when searching by text",
      )
    }
  } catch (e) {
    throw new Error(
      "Did not receive the proper response when searching by text",
    )
  }
}

const searchReality = async () => {
  try {
    let response = await searchByGenre()
    let lengthAssertion = assert(2, response.movies.length)
    let movie = response.movies.pop()
    let imdb = movie.imdb.id === 4613322
    let writers = movie.writers.length === 1
    let title = movie.title === "Louis Theroux: Transgender Kids"
    if (lengthAssertion && imdb && writers && title) {
      return true
    } else {
      throw new Error(
        "Did not receive the proper response when searching by genre",
      )
    }
  } catch (e) {
    throw new Error(
      "Did not receive the proper response when searching by genre",
    )
  }
}
