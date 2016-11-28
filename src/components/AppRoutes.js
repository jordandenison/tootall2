import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import routes from '../routes'

export default class AppRoutes extends React.Component {
  render () {
    return (
      <Provider store={this.props.store} key="provider">
        <Router history={this.props.history} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
      </Provider>
    )
  }
}
