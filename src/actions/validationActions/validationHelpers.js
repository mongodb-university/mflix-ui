import request, { requestWithStatus } from "../request"
import * as types from "../actionTypes"

export const searchByQueryAndPage = (which, query, page) => {
  const encodedQuery = encodeURIComponent(query)
  return request(
    `/api/v1/movies/search?${which}=${encodedQuery}&page=${page}`,
    {
      method: "GET",
      mode: "cors",
    },
  )
    .then(res => res)
    .catch(error => error)
}

export const checkMovieByIDError = () => {
  return requestWithStatus(`/api/v1/movies/id/foobar`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}

export const searchByFacetAndPage = (query, page) => {
  const encodedQuery = encodeURIComponent(query)
  return request(
    `/api/v1/movies/facet-search?cast=${encodedQuery}&page=${page}`,
    {
      method: "GET",
      mode: "cors",
    },
  )
    .then(res => res)
    .catch(error => error)
}

export const assert = (expected, actual) => expected === actual

export function beginTicketValidation(ticket) {
  return { type: types.VALIDATING_TICKET, ticket }
}

export const genRandomUser = () => ({
  name: Math.random()
    .toString(36)
    .substr(2, 9),
  email: `${Math.random()
    .toString(36)
    .substr(2, 9)}@${Math.random()
    .toString(36)
    .substr(2, 5)}.${Math.random()
    .toString(36)
    .substr(2, 3)}`,
  password: `${Math.random()
    .toString(36)
    .substr(2, 9)}`,
})

export const deleteUser = (token, user) => {
  return requestWithStatus(`/api/v1/user/delete`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ password: user.password }),
  })
    .then(res => res)
    .catch(error => error)
}

export const logout = user => {
  return requestWithStatus(`/api/v1/user/logout`, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${user}`,
      "content-type": "application/json",
    },
  })
    .then(res => res)
    .catch(error => error)
}

export const login = user => {
  return requestWithStatus(`/api/v1/user/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(user => user)
    .catch(error => error)
}

export const register = user => {
  return requestWithStatus(`/api/v1/user/register`, {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(user => user)
    .catch(error => error)
}

export function getMovie(id) {
  return request(`/api/v1/movies/id/${id}`, {
    method: "GET",
    mode: "cors",
  })
    .then(res => res)
    .catch(error => error)
}

export function submitComment(movieID, comment, token) {
  return requestWithStatus(`/api/v1/movies/comment`, {
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
    .then(json => json)
    .catch(e => e)
}

export function editComment(commentID, update, token, movie_id) {
  return requestWithStatus(`/api/v1/movies/comment`, {
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
    .then(json => json)
    .catch(e => e)
}

export function deleteComment(comment_id, token, movie_id) {
  return requestWithStatus(`/api/v1/movies/comment`, {
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
    .then(json => json)
    .catch(e => e)
}
