import * as types from "./actionTypes"

export function toggleDrawer() {
  return { type: types.TOGGLE_DRAWER }
}

export function clearError(key) {
  return { type: types.CLEAR_ERROR, key }
}
