import React from 'react'
import path from 'path'
import { Server } from 'http'
import Express from 'express'
import errors from './services/errors'
import cacheBuster from '../cacheBuster'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, Router } from 'react-router'
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux'
import createHistory from 'react-router/lib/createMemoryHistory'
import routes from './routes'

process.on('uncaughtException', errors.uncaughtExceptionHandler)

const app = new Express()
const server = new Server(app)

app.disable('x-powered-by')

app.use('/images', Express.static(path.join(__dirname, '../public/images')))
app.use('/scripts', Express.static(path.join(__dirname, '../public/scripts')))
app.use('/styles', Express.static(path.join(__dirname, '../public/styles')))
app.use(errors.serverExceptionHandler)

const scriptFileName = `dist${process.env.NODE_ENV === 'production' ? cacheBuster : ''}.js`
const scriptTag = `<script type="text/javascript" src="/scripts/${scriptFileName}" charSet="UTF-8"></script>`

const createPage = (html, store) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React Redux Universal Boilerplate</title>
      <link rel="stylesheet" type="text/css" href="/styles/styles.css">
    </head>
    <body class="pushable">
      <div id="main" class="pusher">${html}</div>
      <script charSet="UTF-8">
        window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}
      </script>
      ${scriptTag}
    </body>
  </html>
`

app.get('*', (req, res) => {
  const store = createStore(combineReducers({ routing }))
  const memoryHistory = createHistory(req.originalUrl)
  const history = syncHistoryWithStore(memoryHistory, store)

  match(
    { history, routes, location: req.url }, err => {
      if (err) { return res.status(500).send(err.message) }

      const html = renderToString(
        <Provider store={store} key="provider">
          <Router history={history} children={routes} />
        </Provider>)
      return res.status(200).send(createPage(html, store))
    })
})

const port = process.env.PORT || 3000
server.listen(port, err => {
  if (err) { return console.error(err) }
  console.info(`Server running on ${port} [${process.env.NODE_ENV}]`)
})

export default server
