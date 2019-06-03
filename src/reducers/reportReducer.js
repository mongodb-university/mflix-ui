import {
  FETCH_USER_REPORT,
  RECEIVED_USER_REPORT_SUCCESS,
  RECEIVED_USER_REPORT_FAILURE,
} from "../actions/actionTypes"

const initialState = {
  fetching: false,
  report: [],
}

export default function misc(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_USER_REPORT_FAILURE:
      return {
        report: [],
        fetching: false,
      }
    case RECEIVED_USER_REPORT_SUCCESS:
      return {
        report: action.report,
        fetching: false,
      }
    case FETCH_USER_REPORT:
      return {
        ...state,
        fetching: true,
      }
    default:
      return state
  }
}
