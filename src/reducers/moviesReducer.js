import {
  RECEIVED_MOVIES,
  RECEIVED_MOVIE_BY_ID,
  VIEW_MOVIE,
  RECEIVED_SEARCH_RESULTS,
  RECEIVED_COUNTRY_RESULTS,
  MOVIE_DETAIL,
  RECEIVED_PAGINATION,
  BEGIN_PAGING,
  PROP_FACET_FILTER,
  SUBMIT_COMMENT_SUCCESS,
  UPDATE_COMMENT_SUCCESS
} from "../actions/actionTypes"

const initialState = {
  movies: [],
  page: 0,
  movie: {},
  filters: {},
  facets: {
    rating: [],
    runtime: []
  },
  entries_per_page: 0,
  total_results: 0,
  viewMovie: false,
  apiError: false,
  fetchMovieFailure: false,
  searchMovieFailure: false,
  paging: false,
  titles: [],
  facetFilters: {
    rating: {},
    runtime: {}
  },
  shownMovies: []
}

/**
 * @typedef Bucket
 * @property {number} _id The lower bound of this statistical bucket
 * @property {number} count The count of elements in this bucket
 */

/**
 *
 * @param {[Bucket]} left An array of Buckets
 * @param {[Bucket]} right An array of Buckets
 * @returns {[Bucket]} The combined results of merging the statistical buckets
 */
const mergeStatisticalFacets = (left, right) => {
  let combinedBuckets = {}
  left.forEach(bucket => {
    if (bucket) {
      combinedBuckets[bucket._id] = bucket.count
    }
  })
  right.forEach(bucket => {
    if (combinedBuckets[bucket._id] !== undefined) {
      combinedBuckets[bucket._id] += bucket.count
    } else {
      combinedBuckets[bucket._id] = bucket.count
    }
  })
  return Object.keys(combinedBuckets).map(elem => {
    return {
      _id: elem,
      count: combinedBuckets[elem]
    }
  })
}

const applyFacetFilters = (movies, facetFilters) => {
  const { rating, runtime } = facetFilters
  let filteredMovies = movies.slice()
  if (Object.keys(rating).length || Object.keys(runtime).length) {
    const filters = [
      ...Object.keys(rating).map(key => rating[key]),
      ...Object.keys(runtime).map(key => runtime[key])
    ]
    filteredMovies = filteredMovies.filter(elem => filters.some(fn => fn(elem)))
  }
  return filteredMovies
}

export default function movie(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_COMMENT_SUCCESS:
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        movie: {
          ...state.movie,
          comments: action.comments
        }
      }

    case PROP_FACET_FILTER:
      let tempFacetFilters = state.facetFilters
      let { facet, key, filter } = action.payload
      if (tempFacetFilters[facet][key] !== undefined) {
        delete tempFacetFilters[facet][key]
      } else {
        tempFacetFilters[facet][key] = filter
      }
      return {
        ...state,
        facetFilters: {
          runtime: tempFacetFilters.runtime,
          rating: tempFacetFilters.rating
        },
        shownMovies: applyFacetFilters(state.movies, tempFacetFilters)
      }

    case BEGIN_PAGING:
      return {
        ...state,
        paging: true
      }
    case MOVIE_DETAIL:
      return {
        ...state,
        movie: state.movies.filter(elem => elem._id === action.movie).pop()
      }
    case RECEIVED_MOVIES:
      return {
        ...state,
        movies: action.movies,
        page: action.page,
        filters: action.filters,
        entries_per_page: action.entries_per_page,
        total_results: action.total_results,
        shownMovies: applyFacetFilters(action.movies, state.facetFilters)
      }
    case RECEIVED_SEARCH_RESULTS:
      return {
        ...state,
        movies: action.movies,
        page: action.page,
        filters: action.filters,
        entries_per_page: action.entries_per_page,
        total_results: action.total_results,
        facets: {
          rating: (action.facets && action.facets.rating) || [],
          runtime: (action.facets && action.facets.runtime) || []
        },
        shownMovies: applyFacetFilters(action.movies, state.facetFilters)
      }
    case RECEIVED_COUNTRY_RESULTS:
      return {
        ...state,
        titles: action.titles
      }
    case RECEIVED_PAGINATION:
      return {
        ...state,
        movies: action.movies,
        page: action.page,
        filters: action.filters,
        entries_per_page: action.entries_per_page,
        paging: false,
        facets: {
          rating:
            (action.facets &&
              mergeStatisticalFacets(
                state.facets.rating,
                action.facets.rating
              )) ||
            [],
          runtime:
            (action.facets &&
              mergeStatisticalFacets(
                state.facets.runtime,
                action.facets.runtime
              )) ||
            []
        },
        shownMovies: applyFacetFilters(action.movies, state.facetFilters)
      }
    case RECEIVED_MOVIE_BY_ID:
      return { ...state, movie: action.movie }
    case VIEW_MOVIE:
      return { ...state, viewMovie: !state.viewMovie }

    default:
      return state
  }
}
