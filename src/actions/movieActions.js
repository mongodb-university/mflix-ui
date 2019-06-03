import * as types from "./actionTypes"
import request from "./request"

const { useFacets } = window.mflix || {
  useFacets: false,
}

export function viewMovie() {
  return { type: types.VIEW_MOVIE }
}

export function receivedMovies(json) {
  return { type: types.RECEIVED_MOVIES, ...json }
}

export function receivedSearchResults(json) {
  return { type: types.RECEIVED_SEARCH_RESULTS, ...json }
}

export function movieDetail(movie) {
  return { type: types.MOVIE_DETAIL, movie: movie }
}

export function fetchMovies() {
  return dispatch => {
    return fetch(`/api/v1/movies/`, {
      method: "GET",
      mode: "cors",
    })
      .then(response => response.json())
      .then(json => dispatch(receivedMovies(json)))
      .catch(e => dispatch(fetchMoviesError(e.message)))
  }
}

export function searchMovies(subfield, search, history) {
  let query
  let encodedSearch = encodeURI(search)
  switch (subfield) {
    case "genre":
      query = `genre=${encodedSearch}`
      break
    case "cast":
      query = `cast=${encodedSearch}`
      break
    default:
      query = `text=${encodedSearch}`
  }
  if (useFacets && subfield === "cast") {
    return searchByFacet(query, history)
  }
  return dispatch => {
    return request(`/api/v1/movies/search?${query}`, {
      method: "GET",
      mode: "cors",
    })
      .then(json => dispatch(receivedSearchResults(json)))
      .then(() => history.push("/"))
      .catch(e => dispatch(searchMoviesError(subfield)))
  }
}

export function searchByFacet(query, history) {
  return dispatch => {
    return request(`/api/v1/movies/facet-search?${query}`, {
      method: "GET",
      mode: "cors",
    })
      .then(json => dispatch(receivedSearchResults(json)))
      .then(() => history.push("/"))
      .catch(e => dispatch(searchMoviesError(e.message)))
  }
}

export function searchCountries(search, history) {
  return dispatch => {
    let countries = search.split(",").map(elem => `countries=${elem.trim()}`)
    let uri = `/api/v1/movies/countries?${encodeURI(countries.join("&"))}`

    return request(uri, {
      method: "GET",
      mode: "cors",
    })
      .then(json => dispatch(receivedCountryResults(json.titles)))
      .then(() => history.push("/country-results"))
      .catch(e => dispatch(searchCountriesError(e.message)))
  }
}

export function receivedCountryResults(titles) {
  return { type: types.RECEIVED_COUNTRY_RESULTS, titles }
}

export function searchCountriesError(e) {
  return {
    type: types.SEARCH_COUNTRIES_FAILURE,
    error: `Unable to fetch movies from this country`,
  }
}

export function receivedMovieByID(json) {
  return { type: types.RECEIVED_MOVIE_BY_ID, movie: json.movie }
}

export function fetchMovieByID(id, history) {
  return dispatch => {
    return fetch(`/api/v1/movies/id/${id}`, {
      method: "GET",
      mode: "cors",
    })
      .then(response => response.json())
      .then(json => dispatch(receivedMovieByID(json)))
      .then(() => history.replace(`/movies/id/${id}`))
      .catch(e => dispatch(fetchMovieByIDError(e.message)))
  }
}

export function fetchMoviesError(e) {
  return {
    type: types.FETCH_MOVIES_FAILURE,
    error: `Unable to fetch movies`,
  }
}

export function fetchMovieByIDError(e) {
  return {
    type: types.FETCH_MOVIE_BY_ID_FAILURE,
    error: `Unable to fetch the movie by _id`,
  }
}

export function searchMoviesError(e) {
  return {
    type: types.SEARCH_MOVIES_FAILURE,
    error: `Unable to search for ` + e + `.`,
  }
}

export function beginPaging() {
  return { type: types.BEGIN_PAGING }
}

export function paginate(currState, currPage, filters) {
  return dispatch => {
    let query
    let url
    if (Object.keys(filters).length !== 0) {
      query = Object.keys(filters).reduce(
        (acc, curr) => [...acc, `${curr}=${filters[curr]}`],
        [],
      )
      query = "?" + query.join("&") + `&page=${currPage + 1}`
    } else {
      query = `?page=${currPage + 1}`
    }
    if (Object.keys(filters).includes("cast") && useFacets) {
      url = `/api/v1/movies/facet-search${encodeURI(query)}`
    } else {
      url = `/api/v1/movies/search${encodeURI(query)}`
    }
    return request(url, {
      method: "GET",
      mode: "cors",
    })
      .then(json =>
        dispatch(receivedPagination(currState, currPage, json, dispatch)),
      )
      .catch(e => dispatch(fetchMoviesError(e.message)))
  }
}

export function receivedPagination(currState, currPage, json, dispatch) {
  let currentMovies = currState.map(elem => elem._id)
  let movies = json.movies.filter(movie => !currentMovies.includes(movie._id))
  movies = [...currState, ...movies]
  let page = movies.length > currState.length ? json.page : currPage
  if (page !== currPage) {
    return {
      type: types.RECEIVED_PAGINATION,
      ...json,
      movies,
      page,
      facets: json.facets,
    }
  } else {
    return { type: types.NO_OP }
  }
}

export function submitComment(movieID, comment, token) {
  return dispatch => {
    return request(`/api/v1/movies/comment`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        movie_id: movieID,
        comment,
      }),
    })
      .then(json => dispatch(receivedCommentSubmissionOk(json)))
      .catch(e => console.log(e))
  }
}

export function receivedCommentSubmissionOk(json) {
  return { type: types.SUBMIT_COMMENT_SUCCESS, comments: json.comments }
}

export function editComment(commentID, update, token, movie_id) {
  return dispatch => {
    return request(`/api/v1/movies/comment`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        comment_id: commentID,
        updated_comment: update,
        movie_id,
      }),
    })
      .then(json => dispatch(receivedCommentUpdateOk(json)))
      .catch(e => console.log(e))
  }
}

export function receivedCommentUpdateOk(json) {
  return { type: types.UPDATE_COMMENT_SUCCESS, comments: json.comments }
}

export function deleteComment(comment_id, token, movie_id) {
  return dispatch => {
    return request(`/api/v1/movies/comment`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        comment_id,
        movie_id,
      }),
    })
      .then(json => dispatch(receivedCommentUpdateOk(json)))
      .catch(e => console.log(e))
  }
}

export function applyFacetFilter(facet, key, filter) {
  return { type: types.PROP_FACET_FILTER, payload: { facet, key, filter } }
}
