import * as types from "../actionTypes"
import request, { requestWithStatus } from "../request"
import {
  beginTicketValidation,
  genRandomUser,
  deleteUser,
} from "./validationHelpers"

const invalid_auth_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjIxNzI3NzMsIm5iZiI6MTUyMjE3Mjc3MywianRpIjoiYjFlYmI0ZDQtNjZlZS00MTY4LTg0MWQtZGNhODJkMThmN2NhIiwiZXhwIjoxNTIyMTczNjczLCJpZGVudGl0eSI6eyJlbWFpbCI6ImZvb2JhekBiYXIuY29tIiwibmFtZSI6ImZvbyBiYXIiLCJwYXNzd29yZCI6bnVsbCwicHJlZmVyZW5jZXMiOnsiZmF2b3JpdGVfY2FzdCI6Ik1lZyBSeWFuIiwicHJlZmVycmVkX2xhbmd1YWdlIjoiRW5nbGlzaCJ9fSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsidXNlciI6eyJlbWFpbCI6ImZvb2JhekBiYXIuY29tIiwibmFtZSI6ImZvbyBiYXIiLCJwYXNzd29yZCI6bnVsbCwicHJlZmVyZW5jZXMiOnsiZmF2b3JpdGVfY2FzdCI6Ik1lZyBSeWFuIiwicHJlZmVycmVkX2xhbmd1YWdlIjoiRW5nbGlzaCJ9fX19.q9z_tG7gEqaRMfrbTpj9Jz52vocqOBWgEpCd3KC6giI"

// the martian
export function validateUserReport() {
  return async dispatch => {
    try {
      dispatch(beginTicketValidation("UserReport"))
      let testUser = genRandomUser()
      const registerResponse = await register(testUser)
      const { auth_token } = registerResponse
      const badReportRequest = await getUserReport(invalid_auth_token)
      const goodReportRequest = await getUserReport(auth_token)
      if (badReportRequest.ok) {
        throw new Error("Invalid response to bad user report request")
      }
      if (
        !goodReportRequest.ok ||
        goodReportRequest.json.report.length !== 20
      ) {
        throw new Error("Invalid response to good user report request")
      }
      deleteUser(auth_token, testUser)
      return dispatch(validateUserReportSuccess())
    } catch (e) {
      return dispatch(validateUserReportError(new Error(e.message)))
    }
  }
}

export function validateUserReportSuccess() {
  return { type: types.VALIDATE_USER_REPORT_SUCCESS }
}

export function validateUserReportError(error) {
  return { type: types.VALIDATE_USER_REPORT_ERROR, error }
}

/**
 * Ticket 11 internal functions
 */

const getUserReport = token => {
  return requestWithStatus(`/api/v1/user/comment-report`, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  })
    .then(res => res)
    .catch(error => error)
}

const register = user => {
  return request(`/api/v1/user/make-admin`, {
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
