import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import movies from "../reducers/moviesReducer"
import errors from "../reducers/errorsReducer"
import fetches from "../reducers/fetchReducer"
import user from "../reducers/userReducer"
import misc from "../reducers/miscReducer"
import validate from "../reducers/validationReducer"
import report from "../reducers/reportReducer"
import createHistory from "history/createBrowserHistory"
import { routerReducer, routerMiddleware } from "react-router-redux"

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Persisted user state

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

export default function configureStore() {
  return createStore(
    combineReducers({
      report,
      misc,
      validate,
      user,
      errors,
      movies,
      fetches,
      router: routerReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, middleware)
  )
}
