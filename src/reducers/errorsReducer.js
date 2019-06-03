import {
  RECEIVED_MOVIES,
  RECEIVED_MOVIE_BY_ID,
  RECEIVED_SEARCH_RESULTS,
  RECEIVED_COUNTRY_RESULTS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_BY_ID_FAILURE,
  SEARCH_MOVIES_FAILURE,
  SEARCH_COUNTRIES_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR
} from "../actions/actionTypes";

const initialState = {
  userErrName: "",
  userErrPassword: "",
  userErrEmail: "",
  fetchMovieErrMsg: "",
  searchMovieErrMsg: "",
  searchCountriesErrMsg: "",
  fetchMovieByIDErrMsg: ""
};

export default function errors(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR:
      let newState = {
        ...state,
        [action.key]: ""
      };
      return { ...newState };

    case RECEIVED_MOVIES:
      newState = {
        ...state,
        fetchMovieErrMsg: ""
      };
      return { ...newState };

    case RECEIVED_SEARCH_RESULTS:
      newState = {
        ...state,
        searchMovieErrMsg: ""
      };
      return { ...newState };

    case RECEIVED_COUNTRY_RESULTS:
      newState = {
        ...state,
        searchCountriesErrMsg: ""
      };
      return { ...newState };

    case RECEIVED_MOVIE_BY_ID:
      newState = {
        ...state,
        fetchMovieByIDErrMsg: ""
      };
      return { ...newState };

    case LOGIN_SUCCESS:
      newState = {
        ...state,
        userErrMsg: ""
      };
      return { ...newState };

    case LOGIN_FAIL:
      const error = action.error.error.error;
      return {
        ...state,
        userErrName: error.name || "",
        userErrPassword: error.password || "",
        userErrEmail: error.email || "",
        userErrMsg:
          error === "Unauthorized" ? "Invalid username or password" : ""
      };

    case FETCH_MOVIE_BY_ID_FAILURE:
      return {
        ...state,
        fetchMovieByIDErrMsg: action.error
      };

    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        fetchMovieErrMsg: action.error
      };

    case SEARCH_MOVIES_FAILURE:
      console.log("search failure! ", action.error);
      return {
        ...state,
        searchMovieErrMsg: action.error
      };

    case SEARCH_COUNTRIES_FAILURE:
      return {
        ...state,
        searchCountriesErrMsg: action.error
      };

    default:
      return state;
  }
}
