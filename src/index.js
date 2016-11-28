import React from 'react'
import ReactDOM from 'react-dom'
import AppRoutes from './components/AppRoutes'
import { createStore } from './redux/store'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

window.onload = () => {
  const store = createStore(browserHistory, window.__INITIAL_STATE__)
  const history = syncHistoryWithStore(browserHistory, store)

  if (!document.getElementById('main')) {
    const main = document.createElement('div')
    main.id = 'main'
    document.body.appendChild(main)
  }

  ReactDOM.render(<AppRoutes history={history} store={store} />, document.getElementById('main'))
}
