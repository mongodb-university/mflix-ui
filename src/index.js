import React from "react"
import ReactDOM from "react-dom"
import MainContainer from "./containers/MainContainer"
import { Provider } from "react-redux"
import configureStore from "../src/store/configureStore"
import { ConnectedRouter } from "react-router-redux"
import createHistory from "history/createBrowserHistory"
import { saveState } from "./store/localStorage"
import throttle from "lodash.throttle"

const history = createHistory()
const store = configureStore()

store.subscribe(
  throttle(() => {
    saveState(store.getState().user)
  }, 1000),
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)
