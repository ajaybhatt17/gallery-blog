import { createStore, bindActionCreators, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { useRouterHistory } from 'react-router'
import rootReducer from './reducers/index'
import { createHistory } from 'history'

import { connect } from 'react-redux'
import * as actionCreators from './actions/actionCreators'

let middleware;
if (process.env.NODE_ENV !== 'production') {
  middleware = applyMiddleware(promiseMiddleware(), thunk, logger())
} else {
  middleware = applyMiddleware(promiseMiddleware(), thunk)
}

function RunDevToolExtensionIfNotInProduction () {
  const shouldExposeState = (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') &&
                            window.devToolsExtension

  return (shouldExposeState ? window.devToolsExtension() : (f) => f)
}

export const store = createStore(
  rootReducer,
  compose(middleware, RunDevToolExtensionIfNotInProduction())
)

export const history = useRouterHistory(createHistory)({
  basename: '/'
})

export const mapStateToProps = state => state

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export function connectComponent (component) {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}
