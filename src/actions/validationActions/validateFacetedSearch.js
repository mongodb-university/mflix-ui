import * as types from "../actionTypes"
import {
  searchByFacetAndPage,
  assert,
  beginTicketValidation
} from "./validationHelpers"

export function validateFacetedSearch() {
  return async dispatch => {
    dispatch(beginTicketValidation("FacetedSearch"))
    try {
      let facetSearch = await searchFacet()
      let facetPagingSearch = await searchFacetPaging()
      if ([facetSearch, facetPagingSearch].every(elem => elem)) {
        return dispatch(validateFacetedSearchSuccess())
      }
    } catch (e) {
      return dispatch(validateFacetedSearchError(e))
    }
  }
}

export function validateFacetedSearchSuccess() {
  return { type: types.VALIDATE_FACETED_SEARCH_SUCCESS }
}

export function validateFacetedSearchError(error) {
  return { type: types.VALIDATE_FACETED_SEARCH_ERROR, error }
}

/**
 * Ticket 5 internal functions
 */

const searchFacet = async () => {
  try {
    let response = await searchByFacetAndPage("Denzel Washington", 0)
    let lengthAssertion = assert(20, response.movies.length)
    let { rating, runtime } = response.facets
    let ratingAssertion = assert(4, rating.length)
    let runtimeAssertion = assert(3, runtime.length)
    if (lengthAssertion && ratingAssertion && runtimeAssertion) {
      return true
    } else {
      throw new Error(
        "Did not receive the proper response when performing a faceted search"
      )
    }
  } catch (e) {
    throw new Error(
      "Did not receive the proper response when performing a faceted search"
    )
  }
}

const searchFacetPaging = async () => {
  try {
    let response = await searchByFacetAndPage("Morgan Freeman", 2)
    let lengthAssertion = assert(19, response.movies.length)
    let { rating, runtime } = response.facets
    let ratingAssertion = assert(3, rating.length)
    let runtimeAssertion = assert(4, runtime.length)
    if (lengthAssertion && ratingAssertion && runtimeAssertion) {
      return true
    } else {
      throw new Error(
        "Did not receive the proper response when performing a faceted search with paging"
      )
    }
  } catch (e) {
    throw new Error(
      "Did not receive the proper response when performing a faceted search with paging"
    )
  }
}
