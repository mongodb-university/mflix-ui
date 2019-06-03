import {
  TOGGLE_DRAWER,
  CHECK_ADMIN,
  CHECK_ADMIN_FAIL,
  CHECK_ADMIN_SUCCESS,
} from "../actions/actionTypes"

const initialState = {
  open: false,
  checkingAdminStatus: false,
}

export default function misc(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { ...state, open: !state.open }

    case CHECK_ADMIN:
      console.log("checking admin begin")
      return { ...state, checkingAdminStatus: true }

    case CHECK_ADMIN_FAIL:
    case CHECK_ADMIN_SUCCESS:
      console.log("checking admin end")
      return { ...state, checkingAdminStatus: false }

    default:
      return state
  }
}
