import * as types from "./actionTypes"
import request from "./request"

export function fetchReport(user, history) {
  return dispatch => {
    dispatch(fetchingReport())
    return request(`/api/v1/user/comment-report`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${user.auth_token}`,
      },
    })
      .then(json => dispatch(receivedReportSuccess(json)))
      .then(() => history.push("/user-report"))
      .catch(e => history.push("/login"))
  }
}

export function fetchingReport() {
  return { type: types.FETCH_USER_REPORT }
}

export function receivedReportSuccess({ report }) {
  return { type: types.RECEIVED_USER_REPORT_SUCCESS, report }
}

export function receivedReportFailure(report) {
  return { type: types.RECEIVED_USER_REPORT_FAILURE, report }
}
