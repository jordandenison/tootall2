import { createStore as _createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import reducer from './reducer'

export const createStore = (history, initialData) => {
  const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
  ]

  return applyMiddleware(...middleware)(_createStore)(reducer, initialData)
}
