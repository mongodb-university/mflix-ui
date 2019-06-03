import {
  FETCH_MOVIES,
  SEARCH_MOVIES,
  FETCH_MOVIE_BY_ID,
  PAGINATE_MOVIES,
} from "../actions/actionTypes"

const initialState = {}

export default function movie(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
    case SEARCH_MOVIES:
    case PAGINATE_MOVIES:
    case FETCH_MOVIE_BY_ID:
      return action
    default:
      return state
  }
}
