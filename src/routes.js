import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import NotFoundPage from './pages/NotFoundPage'
import TestPage from './pages/TestPage'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage} />
    <Route path="test" component={TestPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)
