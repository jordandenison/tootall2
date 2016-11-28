const webpack = require('webpack')

const cacheBuster = require('./cacheBuster')

const minimize = true
const compress = { warnings: false }

module.exports = {
  output: {
    filename: `scripts/dist${cacheBuster}.js`
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({ minimize, compress })],
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        query: { presets: ['es2015', 'react'] },
        include: [ /src/ ]
      }
    ]
  }
}
