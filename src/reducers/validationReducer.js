import {
  VALIDATING_TICKET,
  VALIDATE_CONNECTION,
  VALIDATE_CONNECTION_SUCCESS,
  VALIDATE_CONNECTION_ERROR,
  VALIDATE_PROJECTION,
  VALIDATE_PROJECTION_SUCCESS,
  VALIDATE_PROJECTION_ERROR,
  VALIDATE_TEXT_AND_SUBFIELD,
  VALIDATE_TEXT_AND_SUBFIELD_ERROR,
  VALIDATE_TEXT_AND_SUBFIELD_SUCCESS,
  VALIDATE_PAGING,
  VALIDATE_PAGING_SUCCESS,
  VALIDATE_PAGING_ERROR,
  VALIDATE_FACETED_SEARCH,
  VALIDATE_FACETED_SEARCH_SUCCESS,
  VALIDATE_FACETED_SEARCH_ERROR,
  VALIDATE_USER_MANAGEMENT,
  VALIDATE_USER_MANAGEMENT_SUCCESS,
  VALIDATE_USER_MANAGEMENT_ERROR,
  VALIDATE_USER_PREFERENCES,
  VALIDATE_USER_PREFERENCES_SUCCESS,
  VALIDATE_USER_PREFERENCES_ERROR,
  VALIDATE_GET_COMMENTS,
  VALIDATE_GET_COMMENTS_ERROR,
  VALIDATE_GET_COMMENTS_SUCCESS,
  VALIDATE_CREATE_UPDATE_COMMENTS,
  VALIDATE_CREATE_UPDATE_COMMENTS_SUCCESS,
  VALIDATE_CREATE_UPDATE_COMMENTS_ERROR,
  VALIDATE_DELETE_COMMENTS,
  VALIDATE_DELETE_COMMENTS_SUCCESS,
  VALIDATE_DELETE_COMMENTS_ERROR,
  VALIDATE_USER_REPORT,
  VALIDATE_USER_REPORT_SUCCESS,
  VALIDATE_USER_REPORT_ERROR,
  VALIDATE_MIGRATION,
  VALIDATE_MIGRATION_SUCCESS,
  VALIDATE_MIGRATION_ERROR,
  VALIDATE_CONNECTION_POOLING,
  VALIDATE_CONNECTION_POOLING_SUCCESS,
  VALIDATE_CONNECTION_POOLING_ERROR,
  VALIDATE_TIMEOUTS,
  VALIDATE_TIMEOUTS_SUCCESS,
  VALIDATE_TIMEOUTS_ERROR,
  VALIDATE_ERROR_HANDLING,
  VALIDATE_ERROR_HANDLING_SUCCESS,
  VALIDATE_ERROR_HANDLING_ERROR,
  VALIDATE_POLP,
  VALIDATE_POLP_SUCCESS,
  VALIDATE_POLP_ERROR
} from "../actions/actionTypes"

const initialState = {
  hasWeek1Errors: false,
  hasWeek2Errors: false,
  validatingConnection: false,
  validatingProjection: false,
  validatingTextAndSubfield: false,
  validatingPaging: false,
  validatingFacetedSearch: false,
  validatingUserManagement: false,
  validatingUserPreferences: false,
  validatingGetComments: false,
  validatingCreateUpdateComments: false,
  validatingDeleteComments: false,
  validatingUserReport: false,
  validatingMigration: false,
  validatingConnectionPooling: false,
  validatingTimeouts: false,
  validatingErrorHandling: false,
  validatingPOLP: false,
  week1Validating: false,
  week2Validating: false,
  ConnectionError: false,
  ProjectionError: false,
  TextAndSubfieldError: false,
  PagingError: false,
  FacetedSearchError: false,
  UserManagementError: false,
  UserPreferencesError: false,
  GetCommentsError: false,
  CreateUpdateCommentsError: false,
  DeleteCommentsError: false,
  UserReportError: false,
  MigrationError: false,
  ConnectionPoolingError: false,
  TimeoutsError: false,
  ErrorHandlingError: false,
  POLPError: false,
  ConnectionErrorMessage: "",
  ProjectionErrorMessage: "",
  TextAndSubfieldErrorMessage: "",
  PagingErrorMessage: "",
  FacetedSearchErrorMessage: "",
  UserManagementErrorMessage: "",
  UserPreferencesErrorMessage: "",
  GetCommentsErrorMessage: "",
  CreateUpdateCommentsErrorMessage: "",
  DeleteCommentsErrorMessage: "",
  UserReportErrorMessage: "",
  MigrationErrorMessage: "",
  ConnectionPoolingErrorMessage: "",
  TimeoutsErrorMessage: "",
  ErrorHandlingErrorMessage: "",
  POLPErrorMessage: "",
  ConnectionSuccess: "You",
  ProjectionSuccess: "Need",
  TextAndSubfieldSuccess: "To",
  PagingSuccess: "Take",
  FacetedSearchSuccess: "M220",
  UserManagementSuccess: "Courses",
  UserPreferencesSuccess: "To",
  GetCommentsSuccess: "See",
  CreateUpdateCommentsSuccess: "The",
  DeleteCommentsSuccess: "5ac25c280a80ed6e67e1cecb",
  UserReportSuccess: "Validation",
  MigrationSuccess: "Codes",
  ConnectionPoolingSuccess: "And",
  TimeoutsSuccess: "Complete",
  ErrorHandlingSuccess: "The",
  POLPSuccess: "Labs"
}

const hasWeek1Errors = state => {
  return (
    state.ConnectionError ||
    state.ProjectionError ||
    state.TextAndSubfieldError ||
    state.PagingError ||
    state.FacetedSearchError
  )
}

const week1Validating = state => {
  return (
    state.validatingConnection ||
    state.validatingProjection ||
    state.validatingTextAndSubfield ||
    state.validatingPaging ||
    state.validatingFacetedSearch
  )
}

const week2Validating = state => {
  return (
    state.validatingUserManagement ||
    state.validatingUserPreferences ||
    state.validatingGetComments ||
    state.validatingCreateUpdateComments ||
    state.validatingDeleteComments ||
    state.validatingUserReport ||
    state.validatingMigration ||
    state.validatingConnectionPooling ||
    state.validatingTimeouts ||
    state.validatingErrorHandling ||
    state.validateingPOLP
  )
}

const hasWeek2Errors = state => {
  return (
    state.UserManagementError ||
    state.UserPreferencesError ||
    state.GetCommentsError ||
    state.CreateUpdateCommentsError ||
    state.DeleteCommentsError ||
    state.UserReportError ||
    state.MigrationError ||
    state.ConnectionPoolingError ||
    state.TimeoutsError ||
    state.ErrorHandlingError ||
    state.POLPError
  )
}

export default function validate(state = initialState, action) {
  switch (action.type) {
    case VALIDATING_TICKET:
      return { ...state, [`validating${action.ticket}`]: true }
    case VALIDATE_CONNECTION:
    case VALIDATE_PROJECTION:
    case VALIDATE_TEXT_AND_SUBFIELD:
    case VALIDATE_PAGING:
    case VALIDATE_FACETED_SEARCH:
    case VALIDATE_USER_MANAGEMENT:
    case VALIDATE_USER_PREFERENCES:
    case VALIDATE_GET_COMMENTS:
    case VALIDATE_CREATE_UPDATE_COMMENTS:
    case VALIDATE_DELETE_COMMENTS:
    case VALIDATE_USER_REPORT:
    case VALIDATE_MIGRATION:
    case VALIDATE_CONNECTION_POOLING:
    case VALIDATE_TIMEOUTS:
    case VALIDATE_ERROR_HANDLING:
    case VALIDATE_POLP:
      return action
    case VALIDATE_CONNECTION_SUCCESS:
      let newState = {
        ...state,
        ConnectionSuccess: initialState.ConnectionSuccess,
        ConnectionError: false,
        ConnectionErrorMessage: "",
        validatingConnection: false
      }
      return {
        ...newState,
        hasWeek1Errors: hasWeek1Errors(newState),
        week1Validating: week1Validating(newState)
      }
    case VALIDATE_PROJECTION_SUCCESS:
      newState = {
        ...state,
        ProjectionSuccess: initialState.ProjectionSuccess,
        ProjectionError: false,
        ProjectionErrorMessage: "",
        validatingProjection: false
      }
      return {
        ...newState,
        hasWeek1Errors: hasWeek1Errors(newState),
        week1Validating: week1Validating(newState)
      }

    case VALIDATE_TEXT_AND_SUBFIELD_SUCCESS:
      newState = {
        ...state,
        TextAndSubfieldSuccess: initialState.TextAndSubfieldSuccess,
        TextAndSubfieldError: false,
        TextAndSubfieldErrorMessage: "",
        validatingTextAndSubfield: false
      }
      return {
        ...newState,
        hasWeek1Errors: hasWeek1Errors(newState),
        week1Validating: week1Validating(newState)
      }

    case VALIDATE_PAGING_SUCCESS:
      newState = {
        ...state,
        PagingSuccess: initialState.PagingSuccess,
        PagingError: false,
        PagingErrorMessage: "",
        validatingPaging: false
      }
      return {
        ...newState,
        hasWeek1Errors: hasWeek1Errors(newState),
        week1Validating: week1Validating(newState)
      }

    case VALIDATE_FACETED_SEARCH_SUCCESS:
      newState = {
        ...state,
        FacetedSearchSuccess: initialState.FacetedSearchSuccess,
        FacetedSearchError: false,
        FacetedSearchErrorMessage: "",
        validatingFacetedSearch: false
      }
      return {
        ...newState,
        hasWeek1Errors: hasWeek1Errors(newState),
        week1Validating: week1Validating(newState)
      }

    case VALIDATE_USER_MANAGEMENT_SUCCESS:
      newState = {
        ...state,
        UserManagementSuccess: initialState.UserManagementSuccess,
        UserManagementError: false,
        UserManagementErrorMessage: "",
        validatingUserManagement: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }
    case VALIDATE_USER_PREFERENCES_SUCCESS:
      newState = {
        ...state,
        UserPreferencesSuccess: initialState.UserPreferencesSuccess,
        UserPreferencesError: false,
        UserPreferencesErrorMessage: "",
        validatingUserPreferences: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_GET_COMMENTS_SUCCESS:
      newState = {
        ...state,
        GetCommentsSuccess: initialState.GetCommentsSuccess,
        GetCommentsError: false,
        GetCommentsErrorMessage: "",
        validatingGetComments: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_CREATE_UPDATE_COMMENTS_SUCCESS:
      newState = {
        ...state,
        CreateUpdateCommentsSuccess: initialState.CreateUpdateCommentsSuccess,
        CreateUpdateCommentsError: false,
        CreateUpdateCommentsErrorMessage: "",
        validatingCreateUpdateComments: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_DELETE_COMMENTS_SUCCESS:
      newState = {
        ...state,
        DeleteCommentsSuccess: initialState.DeleteCommentsSuccess,
        DeleteCommentsError: false,
        DeleteCommentsErrorMessage: "",
        validatingDeleteComments: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_USER_REPORT_SUCCESS:
      newState = {
        ...state,
        UserReportSuccess: initialState.UserReportSuccess,
        UserReportError: false,
        UserReportErrorMessage: "",
        validatingUserReport: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_MIGRATION_SUCCESS:
      newState = {
        ...state,
        MigrationSuccess: initialState.MigrationSuccess,
        MigrationError: false,
        MigrationErrorMessage: "",
        validatingMigration: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_CONNECTION_POOLING_SUCCESS:
      newState = {
        ...state,
        ConnectionPoolingSuccess: initialState.ConnectionPoolingSuccess,
        ConnectionPoolingError: false,
        ConnectionPoolingErrorMessage: "",
        validatingConnectionPooling: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_TIMEOUTS_SUCCESS:
      newState = {
        ...state,
        TimeoutsSuccess: initialState.TimeoutsSuccess,
        TimeoutsError: false,
        TimeoutsErrorMessage: "",
        validatingTimeouts: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_ERROR_HANDLING_SUCCESS:
      newState = {
        ...state,
        ErrorHandlingSuccess: initialState.ErrorHandlingSuccess,
        ErrorHandlingError: false,
        ErrorHandlingErrorMessage: "",
        validatingErrorHandling: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_POLP_SUCCESS:
      newState = {
        ...state,
        POLPSuccess: initialState.POLPSuccess,
        POLPError: false,
        POLPErrorMessage: "",
        validatingPOLP: false
      }
      return {
        ...newState,
        hasWeek2Errors: hasWeek2Errors(state),
        week2Validating: week2Validating(newState)
      }

    case VALIDATE_CONNECTION_ERROR:
      newState = {
        ...state,
        ConnectionError: true,
        ConnectionSuccess: "",
        ConnectionErrorMessage: action.error.message,
        hasWeek1Errors: true,
        validatingConnection: false
      }
      return { ...newState, week1Validating: week1Validating(newState) }

    case VALIDATE_PROJECTION_ERROR:
      newState = {
        ...state,
        ProjectionError: true,
        ProjectionSuccess: "",
        ProjectionErrorMessage: action.error.message,
        hasWeek1Errors: true,
        validatingProjection: false
      }
      return { ...newState, week1Validating: week1Validating(newState) }

    case VALIDATE_TEXT_AND_SUBFIELD_ERROR:
      newState = {
        ...state,
        TextAndSubfieldError: true,
        TextAndSubfieldSuccess: "",
        TextAndSubfieldErrorMessage: action.error.message,
        hasWeek1Errors: true,
        validatingTextAndSubfield: false
      }
      return { ...newState, week1Validating: week1Validating(newState) }

    case VALIDATE_PAGING_ERROR:
      newState = {
        ...state,
        PagingError: true,
        PagingSuccess: "",
        PagingErrorMessage: action.error.message,
        hasWeek1Errors: true,
        validatingPaging: false
      }
      return { ...newState, week1Validating: week1Validating(newState) }

    case VALIDATE_FACETED_SEARCH_ERROR:
      newState = {
        ...state,
        FacetedSearchError: true,
        FacetedSearchSuccess: "",
        FacetedSearchErrorMessage: action.error.message,
        hasWeek1Errors: true,
        validatingFacetedSearch: false
      }
      return { ...newState, week1Validating: week1Validating(newState) }

    case VALIDATE_USER_MANAGEMENT_ERROR:
      newState = {
        ...state,
        UserManagementError: true,
        UserManagementSuccess: "",
        UserManagementErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingUserManagement: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_USER_PREFERENCES_ERROR:
      newState = {
        ...state,
        UserPreferencesError: true,
        UserPreferencesSuccess: "",
        UserPreferencesErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingUserPreferences: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_GET_COMMENTS_ERROR:
      newState = {
        ...state,
        GetCommentsError: true,
        GetCommentsSuccess: "",
        GetCommentsErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingGetComments: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_CREATE_UPDATE_COMMENTS_ERROR:
      newState = {
        ...state,
        CreateUpdateCommentsError: true,
        CreateUpdateCommentsSuccess: "",
        CreateUpdateCommentsErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingCreateUpdateComments: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_DELETE_COMMENTS_ERROR:
      newState = {
        ...state,
        DeleteCommentsError: true,
        DeleteCommentsSuccess: "",
        DeleteCommentsErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingDeleteComments: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_USER_REPORT_ERROR:
      newState = {
        ...state,
        UserReportError: true,
        UserReportSuccess: "",
        UserReportErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingUserReport: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_MIGRATION_ERROR:
      newState = {
        ...state,
        MigrationError: true,
        MigrationSuccess: "",
        MigrationErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingMigration: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_CONNECTION_POOLING_ERROR:
      newState = {
        ...state,
        ConnectionPoolingError: true,
        ConnectionPoolingSuccess: "",
        ConnectionPoolingErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingConnectionPooling: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_TIMEOUTS_ERROR:
      newState = {
        ...state,
        TimeoutsError: true,
        TimeoutsSuccess: "",
        TimeoutsErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingTimeouts: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_ERROR_HANDLING_ERROR:
      newState = {
        ...state,
        ErrorHandlingError: true,
        ErrorHandlingSuccess: "",
        ErrorHandlingErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingErrorHandling: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    case VALIDATE_POLP_ERROR:
      newState = {
        ...state,
        POLPError: true,
        POLPSuccess: "",
        POLPErrorMessage: action.error.message,
        hasWeek2Errors: true,
        validatingPOLP: false
      }
      return { ...newState, week2Validating: week2Validating(newState) }

    default:
      return state
  }
}
